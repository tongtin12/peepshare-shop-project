import { createFileRoute } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { AppShell } from "@/components/AppShell";
import { useStore, statusLabel, statusColor, ORDER_FLOW, type OrderStatus } from "@/lib/store";
import { t } from "@/lib/i18n";
import { money } from "@/lib/format";

export const Route = createFileRoute("/order/$id")({
  component: OrderDetailPage,
});

const stepShort: Record<OrderStatus, { th: string; en: string }> = {
  awaiting_payment: { th: "รอจ่าย", en: "Pending" },
  payment_success: { th: "จ่ายแล้ว", en: "Paid" },
  preparing: { th: "เตรียมของ", en: "Preparing" },
  shipped: { th: "จัดส่ง", en: "Shipped" },
  delivered: { th: "ถึงแล้ว", en: "Delivered" },
  cancelled: { th: "ยกเลิก", en: "Cancelled" },
};

function OrderDetailPage() {
  const { id } = Route.useParams();
  const { lang, orders, advanceOrder, setOrderStatus } = useStore();
  const order = orders.find((o) => o.id === id);

  if (!order) return <AppShell><div className="p-6">Not found</div></AppShell>;

  const len = ORDER_FLOW.length;
  const currentIdx = ORDER_FLOW.indexOf(order.status);
  const canAdvance = currentIdx >= 0 && currentIdx < len - 1;
  const canCancel = order.status !== "delivered" && order.status !== "cancelled";
  const itemCount = order.items.reduce((s, c) => s + c.qty, 0);
  const si = order.shippingInfo;

  const estimate = new Date(order.createdAt + 3 * 86_400_000).toLocaleDateString(
    lang === "th" ? "th-TH" : "en-US",
    { day: "numeric", month: "short", year: "numeric" },
  );

  return (
    <AppShell title={`#${order.id}`}>
      <div className="space-y-3 px-4 py-4">
        {/* Stepper */}
        <div className="rounded-2xl border border-border bg-white p-4 pt-5">
          <div className="relative">
            <div className="absolute left-[10%] right-[10%] top-2 h-0.5 bg-border" />
            <div
              className="absolute left-[10%] top-2 h-0.5 bg-brand-end transition-all"
              style={{ width: `${currentIdx <= 0 ? 0 : (currentIdx / (len - 1)) * 80}%` }}
            />
            <div className="relative flex">
              {ORDER_FLOW.map((s, i) => {
                const done = i < currentIdx;
                const current = i === currentIdx;
                return (
                  <div key={s} className="flex flex-1 flex-col items-center gap-2">
                    <span
                      className={`h-4 w-4 rounded-full ${
                        done || current ? "bg-brand-end" : "border-2 border-border bg-white"
                      } ${current ? "ring-4 ring-[oklch(0.72_0.18_35_/_0.18)]" : ""}`}
                    />
                    <span
                      className={`text-center text-[10px] leading-tight ${
                        current
                          ? "font-bold text-brand-end"
                          : done
                            ? "font-medium text-foreground"
                            : "text-muted-foreground"
                      }`}
                    >
                      {stepShort[s][lang]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          {canAdvance && (
            <button
              onClick={() => advanceOrder(order.id)}
              className="mt-4 w-full rounded-lg bg-surface py-2 text-xs font-semibold text-muted-foreground"
            >
              {t("advance", lang)} →
            </button>
          )}
        </div>

        {/* Order info */}
        <div className="rounded-2xl border border-border bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">
              {lang === "th" ? "คำสั่งซื้อ" : "Order"}: {order.id}
            </p>
            <span className={`chip text-[11px] ${statusColor[order.status]}`}>
              {statusLabel[order.status][lang]}
            </span>
          </div>

          <div className="my-3 border-t border-dashed border-border" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("deliveryEstimate", lang)}</span>
            <span className="font-semibold">{estimate}</span>
          </div>

          <div className="my-3 border-t border-dashed border-border" />
          <p className="text-sm font-semibold">{si.recipient}</p>
          <div className="mt-1.5 flex gap-2 text-xs text-muted-foreground">
            <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="leading-relaxed">
              {si.address}, {si.subdistrict}, {si.district}, {si.province} {si.postcode}
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="phone" className="h-4 w-4 shrink-0" />
            <span>{si.phone}</span>
          </div>

          <div className="my-3 border-t border-dashed border-border" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("shippingMethod", lang)}</span>
            <span className="font-semibold">DHL Express</span>
          </div>
        </div>

        {/* Items */}
        <div className="rounded-2xl border border-border bg-white p-4">
          <div className="flex items-center justify-between border-b border-dashed border-border pb-3">
            <p className="text-sm font-bold">
              {lang === "th" ? "คำสั่งซื้อ" : "Order"}: {order.id}
            </p>
            <p className="text-xs text-muted-foreground">
              ({itemCount} {t("items", lang)}) <span className="font-bold text-foreground">{money(order.total, lang)}</span>
            </p>
          </div>
          <div className="divide-y divide-border">
            {order.items.map((it) => (
              <div key={it.id} className="flex gap-3 py-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-surface">
                  <img src={it.image} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">
                    {[it.size, it.color?.name[lang]].filter(Boolean).join(" • ")}
                  </p>
                  <p className="text-sm font-semibold leading-snug">{it.name[lang]}</p>
                  <p className="mt-0.5 text-sm font-bold">{money(it.price, lang)}</p>
                </div>
                <span className="shrink-0 self-start text-xs text-muted-foreground">{t("qty", lang)}: {it.qty}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking */}
        {currentIdx >= ORDER_FLOW.indexOf("shipped") && currentIdx !== -1 && (
          <div className="rounded-2xl border border-border bg-white p-4">
            <p className="text-xs text-muted-foreground">{t("trackingNo", lang)} (DHL)</p>
            <div className="mt-1 flex items-center justify-between">
              <p className="font-bold">{order.trackingNo}</p>
              <button
                onClick={() => navigator.clipboard?.writeText(order.trackingNo)}
                className="p-1.5 text-muted-foreground"
              >
                <Icon name="copy" className="h-4 w-4" />
              </button>
            </div>
            <a
              href={`https://www.dhl.com/th-en/home/tracking.html?tracking-id=${order.trackingNo}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-xs font-bold text-brand-end"
            >
              {lang === "th" ? "ติดตามพัสดุ" : "Track shipment"} →
            </a>
          </div>
        )}

        {/* Totals */}
        <div className="space-y-1.5 rounded-2xl border border-border bg-white p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("subtotal", lang)}</span>
            <span className="font-semibold">{money(order.subtotal, lang)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("shipping", lang)}</span>
            <span className="font-semibold">{money(order.shipping, lang)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2">
            <span className="font-bold">{t("total", lang)}</span>
            <span className="text-base font-bold">{money(order.total, lang)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button className="btn-outline flex-1 gap-2">
            <Icon name="phone" className="h-4 w-4" />
            {t("contactUs", lang)}
          </button>
          {canCancel && (
            <button
              onClick={() => setOrderStatus(order.id, "cancelled")}
              className="flex-1 rounded-full border border-destructive/40 py-3.5 font-semibold text-destructive transition-colors active:bg-destructive/5"
            >
              {t("cancelOrder", lang)}
            </button>
          )}
        </div>
      </div>
    </AppShell>
  );
}
