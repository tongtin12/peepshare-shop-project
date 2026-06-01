import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/Icon";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { money } from "@/lib/format";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

const inputCls =
  "w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none border border-transparent focus:border-[#FF8F46]";
const cardCls = "rounded-2xl border border-border bg-white p-4";

function CheckoutPage() {
  const { lang, cart, createOrder } = useStore();
  const navigate = useNavigate();
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const shipping = 60;

  const [form, setForm] = useState({
    recipient: "",
    phone: "",
    address: "",
    province: "",
    district: "",
    subdistrict: "",
    postcode: "",
  });

  const update = (k: keyof typeof form, v: string) => setForm({ ...form, [k]: v });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order = createOrder({ ...form, method: "DHL" });
    navigate({ to: "/payment/$orderId", params: { orderId: order.id } });
  };

  return (
    <AppShell title={t("checkout", lang)}>
      <form onSubmit={handleSubmit} className="space-y-3 px-4 py-4">
        <section className={`${cardCls} space-y-2`}>
          <h3 className="text-sm font-bold">{t("recipient", lang)}</h3>
          <input
            required
            value={form.recipient}
            onChange={(e) => update("recipient", e.target.value)}
            placeholder={t("recipient", lang)}
            className={inputCls}
          />
          <input
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="08X-XXX-XXXX"
            inputMode="tel"
            pattern="^0[0-9]{8,9}$"
            className={inputCls}
          />
        </section>

        <section className={`${cardCls} space-y-2`}>
          <h3 className="text-sm font-bold">{t("address", lang)}</h3>
          <input
            required
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder={t("address", lang)}
            className={inputCls}
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              required
              value={form.province}
              onChange={(e) => update("province", e.target.value)}
              placeholder={t("province", lang)}
              className={inputCls}
            />
            <input
              required
              value={form.district}
              onChange={(e) => update("district", e.target.value)}
              placeholder={t("district", lang)}
              className={inputCls}
            />
            <input
              required
              value={form.subdistrict}
              onChange={(e) => update("subdistrict", e.target.value)}
              placeholder={t("subdistrict", lang)}
              className={inputCls}
            />
            <input
              required
              value={form.postcode}
              onChange={(e) => update("postcode", e.target.value)}
              placeholder={t("postcode", lang)}
              inputMode="numeric"
              pattern="^[0-9]{5}$"
              className={inputCls}
            />
          </div>
        </section>

        <section className={`${cardCls} space-y-2`}>
          <h3 className="text-sm font-bold">{t("shippingMethod", lang)}</h3>
          <div className="flex items-center gap-3 rounded-xl border-2 border-[#FF8F46] bg-white p-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-surface">
              <Icon name="delivery" className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">DHL Express</p>
              <p className="text-xs text-muted-foreground">{lang === "th" ? "2-3 วัน" : "2-3 days"}</p>
            </div>
            <span className="text-sm font-bold">{money(shipping, lang)}</span>
          </div>
        </section>

        <section className={`${cardCls} space-y-1.5 text-sm`}>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("subtotal", lang)}</span>
            <span className="font-semibold">{money(subtotal, lang)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("shipping", lang)}</span>
            <span className="font-semibold">{money(shipping, lang)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2">
            <span className="font-bold">{t("total", lang)}</span>
            <span className="text-base font-bold">{money(subtotal + shipping, lang)}</span>
          </div>
        </section>

        <button type="submit" disabled={cart.length === 0} className="btn-brand w-full disabled:opacity-50">
          {t("continueToPayment", lang)}
        </button>
      </form>
    </AppShell>
  );
}
