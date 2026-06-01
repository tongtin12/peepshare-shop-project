import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "./i18n";
import { products as MOCK_PRODUCTS, type Product } from "./mock-data";

export type PayMethod = "promptpay" | "card";

export type OrderStatus =
  | "awaiting_payment"
  | "payment_success"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled";

export const ORDER_FLOW: OrderStatus[] = [
  "awaiting_payment",
  "payment_success",
  "preparing",
  "shipped",
  "delivered",
];

export interface CartItem {
  id: string; // unique key combining product+variant
  productId: string;
  merchant_id: string;
  name: { th: string; en: string };
  image: string;
  price: number;
  size?: string;
  color?: { name: { th: string; en: string }; hex: string };
  style?: { th: string; en: string };
  qty: number;
}

export interface ShippingInfo {
  recipient: string;
  phone: string;
  address: string;
  province: string;
  district: string;
  subdistrict: string;
  postcode: string;
  method: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: number;
  shippingInfo: ShippingInfo;
  trackingNo: string;
}

interface StoreContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  wishlist: Set<string>;
  toggleWishlist: (id: string) => void;
  orders: Order[];
  createOrder: (shippingInfo: ShippingInfo) => Order;
  advanceOrder: (id: string) => void;
  setOrderStatus: (id: string, s: OrderStatus) => void;
  products: Product[];
  payMethod: PayMethod;
  setPayMethod: (m: PayMethod) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("th");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [orders, setOrders] = useState<Order[]>([]);
  const [payMethod, setPayMethod] = useState<PayMethod>("promptpay");

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + item.qty } : c));
      }
      return [...prev, item];
    });
  };

  const updateQty = (id: string, qty: number) =>
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty: Math.max(1, qty) } : c)));

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((c) => c.id !== id));
  const clearCart = () => setCart([]);

  const toggleWishlist = (id: string) =>
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const createOrder = (shippingInfo: ShippingInfo): Order => {
    const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const shipping = 60;
    const order: Order = {
      id: `E29${Date.now().toString().slice(-6)}`,
      items: [...cart],
      subtotal,
      shipping,
      total: subtotal + shipping,
      status: "awaiting_payment",
      createdAt: Date.now(),
      shippingInfo,
      trackingNo: `TH${Math.floor(Math.random() * 9_000_000_000 + 1_000_000_000)}DHL`,
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    return order;
  };

  const advanceOrder = (id: string) =>
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const idx = ORDER_FLOW.indexOf(o.status);
        if (idx === -1 || idx === ORDER_FLOW.length - 1) return o;
        return { ...o, status: ORDER_FLOW[idx + 1] };
      }),
    );

  const setOrderStatus = (id: string, s: OrderStatus) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: s } : o)));

  return (
    <StoreContext.Provider
      value={{
        lang,
        setLang,
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        orders,
        createOrder,
        advanceOrder,
        setOrderStatus,
        products: MOCK_PRODUCTS,
        payMethod,
        setPayMethod,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};

export const statusLabel: Record<OrderStatus, { th: string; en: string }> = {
  awaiting_payment: { th: "รอชำระเงิน", en: "Awaiting Payment" },
  payment_success: { th: "ชำระเงินสำเร็จ", en: "Payment Successful" },
  preparing: { th: "กำลังจัดเตรียม", en: "Preparing" },
  shipped: { th: "จัดส่งแล้ว", en: "Shipped" },
  delivered: { th: "ส่งถึงแล้ว", en: "Delivered" },
  cancelled: { th: "ยกเลิก", en: "Cancelled" },
};

export const statusColor: Record<OrderStatus, string> = {
  awaiting_payment: "bg-amber-100 text-amber-700",
  payment_success: "bg-emerald-100 text-emerald-700",
  preparing: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-rose-100 text-rose-700",
};
