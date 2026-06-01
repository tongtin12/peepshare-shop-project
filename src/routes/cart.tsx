import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { useStore } from "@/lib/store";
import { getMerchant } from "@/lib/mock-data";
import { t } from "@/lib/i18n";
import { money } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

// Demo discount codes
const PROMOS: Record<string, (subtotal: number, shipping: number) => number> = {
  PEEP100: () => 100,
  SAVE10: (sub) => Math.round(sub * 0.1),
  FREESHIP: (_sub, ship) => ship,
};

function CartPage() {
  const { lang, cart, updateQty, removeFromCart, payMethod, setPayMethod } = useStore();
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const shipping = cart.length ? 60 : 0;

  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ code: string; amount: number } | null>(null);
  const [codeError, setCodeError] = useState(false);
  const discount = applied?.amount ?? 0;
  const total = Math.max(0, subtotal + shipping - discount);

  const applyCode = () => {
    const key = code.trim().toUpperCase();
    const fn = PROMOS[key];
    if (!fn) {
      setApplied(null);
      setCodeError(true);
      return;
    }
    setCodeError(false);
    setApplied({ code: key, amount: Math.min(fn(subtotal, shipping), subtotal + shipping) });
  };

  // Group cart items by merchant
  const byMerchant = new Map<string, typeof cart>();
  cart.forEach((item) => {
    const arr = byMerchant.get(item.merchant_id) ?? [];
    arr.push(item);
    byMerchant.set(item.merchant_id, arr);
  });
  const groups = [...byMerchant.entries()];

  return (
    <AppShell title={t("cart", lang)}>
      {cart.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 grid h-20 w-20 place-items-center rounded-full bg-surface">
            <Icon name="bag" className="h-9 w-9 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold">{t("emptyCart", lang)}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t("emptyCartSub", lang)}</p>
          <Link to="/" className="btn-brand mt-6 text-sm">
            {t("shopNow", lang)}
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-3 px-4 py-3">
            {groups.map(([mid, items]) => {
              const m = getMerchant(mid);
              return (
                <div key={mid} className="overflow-hidden rounded-2xl border border-border bg-white">
                  {/* Store header */}
                  <Link
                    to="/m/$merchantId"
                    params={{ merchantId: mid }}
                    className="flex items-center gap-2 border-b border-border px-3.5 py-3 transition-colors active:bg-surface"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white ring-1 ring-border">
                      <span className="text-[10px] font-bold tracking-tight" style={{ color: m?.accent }}>
                        {m?.mark}
                      </span>
                    </span>
                    <span className="truncate text-sm font-semibold">{m?.handle ?? m?.name[lang]}</span>
                    <Icon name="chevronRight" className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
                  </Link>

                  {/* Items */}
                  <div className="divide-y divide-border">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 p-3.5">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface">
                          <img src={item.image} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="line-clamp-2 text-sm font-semibold leading-snug">{item.name[lang]}</h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              aria-label="remove"
                              className="-mr-1 -mt-0.5 shrink-0 text-muted-foreground transition-colors active:text-foreground"
                            >
                              <Icon name="trash" className="h-5 w-5" />
                            </button>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {[item.size, item.color?.name[lang], item.style?.[lang]].filter(Boolean).join(" • ")}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-base font-bold">{money(item.price * item.qty, lang)}</p>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => updateQty(item.id, item.qty - 1)}
                                aria-label="decrease"
                                className="grid h-7 w-7 place-items-center text-muted-foreground transition-transform active:scale-90"
                              >
                                <Icon name="minus" className="h-[26px] w-[26px]" />
                              </button>
                              <span className="w-5 text-center text-sm font-bold tabular-nums">{item.qty}</span>
                              <button
                                onClick={() => updateQty(item.id, item.qty + 1)}
                                aria-label="increase"
                                className="grid h-7 w-7 place-items-center text-foreground transition-transform active:scale-90"
                              >
                                <Icon name="plus" className="h-[26px] w-[26px]" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sticky bottom-0 mt-auto px-4 pb-3 pt-2">
            <div className="space-y-3 rounded-2xl border border-border bg-white p-4 shadow-[0_-2px_24px_-14px_rgba(17,17,17,0.3)]">
              {/* Discount code */}
              <div>
                <div className="flex gap-2">
                  <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl bg-surface px-3">
                    <Icon name="ticket" className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <input
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                        setCodeError(false);
                      }}
                      placeholder={t("promoCode", lang)}
                      className="min-w-0 flex-1 bg-transparent py-2.5 text-sm uppercase outline-none placeholder:normal-case placeholder:text-muted-foreground"
                    />
                  </div>
                  <button
                    onClick={applyCode}
                    className="shrink-0 rounded-xl bg-foreground px-5 text-sm font-semibold text-white transition-transform active:scale-95"
                  >
                    {t("apply", lang)}
                  </button>
                </div>
                {codeError && <p className="mt-1.5 text-xs text-destructive">{t("codeInvalid", lang)}</p>}
                {applied && (
                  <p className="mt-1.5 text-xs font-medium text-[#16a34a]">
                    {applied.code} · -{money(applied.amount, lang)}
                  </p>
                )}
              </div>

              {/* Payment method */}
              <div className="border-t border-border pt-3">
                <p className="mb-2 text-xs font-semibold text-muted-foreground">{t("payMethodLabel", lang)}</p>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      { id: "promptpay", icon: "qr", label: t("promptpay", lang) },
                      { id: "card", icon: "card", label: t("creditCard", lang) },
                    ] as const
                  ).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPayMethod(m.id)}
                      className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 transition-colors ${
                        payMethod === m.id ? "border-brand-end bg-brand-end/5" : "border-border bg-white"
                      }`}
                    >
                      <Icon name={m.icon} className="h-5 w-5 shrink-0" />
                      <span className="text-sm font-semibold">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1.5 border-t border-border pt-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("subtotal", lang)}</span>
                  <span className="font-semibold">{money(subtotal, lang)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("shipping", lang)}</span>
                  <span className="font-semibold">{money(shipping, lang)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("discount", lang)}</span>
                    <span className="font-semibold text-[#16a34a]">-{money(discount, lang)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="font-bold">{t("total", lang)}</span>
                  <span className="text-base font-bold">{money(total, lang)}</span>
                </div>
              </div>

              <Link to="/checkout" className="btn-brand w-full">
                {t("checkout", lang)}
              </Link>
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}
