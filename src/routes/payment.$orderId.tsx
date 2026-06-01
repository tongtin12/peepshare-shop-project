import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { AppShell } from "@/components/AppShell";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { money } from "@/lib/format";

export const Route = createFileRoute("/payment/$orderId")({
  component: PaymentPage,
});

function PaymentPage() {
  const { orderId } = Route.useParams();
  const { lang, orders, setOrderStatus, payMethod: method, setPayMethod: setMethod } = useStore();
  const navigate = useNavigate();
  const order = orders.find((o) => o.id === orderId);
  const [seconds, setSeconds] = useState(15 * 60);

  useEffect(() => {
    const i = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(i);
  }, []);

  if (!order) return <AppShell><div className="p-6">Order not found</div></AppShell>;

  const handleSuccess = () => {
    setOrderStatus(order.id, "payment_success");
    navigate({ to: "/order/$id/success", params: { id: order.id } });
  };

  const mm = Math.floor(seconds / 60).toString().padStart(2, "0");
  const ss = (seconds % 60).toString().padStart(2, "0");

  return (
    <AppShell title={t("payment", lang)}>
      <div className="px-4 py-4 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setMethod("promptpay")} className={`p-4 rounded-[18px] border-2 flex flex-col items-center gap-2 ${method === "promptpay" ? "border-[#FF8F46] bg-white" : "border-border bg-white"}`}>
            <Icon name="qr" className="w-6 h-6" />
            <span className="text-sm font-bold">{t("promptpay", lang)}</span>
          </button>
          <button onClick={() => setMethod("card")} className={`p-4 rounded-[18px] border-2 flex flex-col items-center gap-2 ${method === "card" ? "border-[#FF8F46] bg-white" : "border-border bg-white"}`}>
            <Icon name="card" className="w-6 h-6" />
            <span className="text-sm font-bold">{t("creditCard", lang)}</span>
          </button>
        </div>

        {method === "promptpay" ? (
          <div className="rounded-[18px] bg-white border border-border p-6 text-center">
            <p className="text-sm text-muted-foreground">{t("scanQr", lang)}</p>
            <p className="text-2xl font-bold text-foreground mt-2">{money(order.total, lang)}</p>
            <div className="my-4 mx-auto w-48 h-48 rounded-2xl bg-surface flex items-center justify-center">
              <img alt="qr" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 29 29'><rect width='29' height='29' fill='white'/><g fill='black'><rect x='0' y='0' width='7' height='7'/><rect x='1' y='1' width='5' height='5' fill='white'/><rect x='2' y='2' width='3' height='3'/><rect x='22' y='0' width='7' height='7'/><rect x='23' y='1' width='5' height='5' fill='white'/><rect x='24' y='2' width='3' height='3'/><rect x='0' y='22' width='7' height='7'/><rect x='1' y='23' width='5' height='5' fill='white'/><rect x='2' y='24' width='3' height='3'/><rect x='9' y='2' width='2' height='2'/><rect x='13' y='1' width='2' height='3'/><rect x='17' y='3' width='2' height='2'/><rect x='10' y='6' width='3' height='2'/><rect x='15' y='7' width='4' height='2'/><rect x='8' y='10' width='2' height='4'/><rect x='12' y='10' width='3' height='3'/><rect x='17' y='11' width='2' height='2'/><rect x='20' y='9' width='2' height='3'/><rect x='9' y='15' width='2' height='2'/><rect x='13' y='14' width='3' height='2'/><rect x='18' y='15' width='2' height='3'/><rect x='22' y='14' width='3' height='2'/><rect x='10' y='18' width='2' height='3'/><rect x='14' y='19' width='3' height='2'/><rect x='19' y='20' width='2' height='2'/><rect x='23' y='18' width='2' height='3'/><rect x='12' y='23' width='2' height='2'/><rect x='16' y='22' width='3' height='3'/><rect x='21' y='24' width='2' height='2'/><rect x='25' y='22' width='2' height='2'/></g></svg>" className="w-44 h-44" />
            </div>
            <p className="text-xs text-muted-foreground">{t("expiresIn", lang)} <span className="font-bold text-foreground">{mm}:{ss}</span></p>
          </div>
        ) : (
          <div className="rounded-[18px] bg-white border border-border p-4 space-y-2">
            <input placeholder="Card number" className="w-full bg-surface rounded-[14px] px-4 py-3 text-sm outline-none" />
            <div className="grid grid-cols-2 gap-2">
              <input placeholder="MM/YY" className="w-full bg-surface rounded-[14px] px-4 py-3 text-sm outline-none" />
              <input placeholder="CVV" className="w-full bg-surface rounded-[14px] px-4 py-3 text-sm outline-none" />
            </div>
            <input placeholder="Cardholder name" className="w-full bg-surface rounded-[14px] px-4 py-3 text-sm outline-none" />
          </div>
        )}

        <button onClick={handleSuccess} className="btn-brand w-full">
          {t("simulateSuccess", lang)}
        </button>
      </div>
    </AppShell>
  );
}
