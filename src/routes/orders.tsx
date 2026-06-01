import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { AppShell } from "@/components/AppShell";
import { useStore, statusLabel, statusColor } from "@/lib/store";
import { t } from "@/lib/i18n";
import { money } from "@/lib/format";

export const Route = createFileRoute("/orders")({
  component: OrdersPage,
});

function OrdersPage() {
  const { lang, orders } = useStore();
  return (
    <AppShell title={t("orders", lang)}>
      {orders.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mb-4">
            <Icon name="receipt" className="w-9 h-9 text-muted-foreground" />
          </div>
          <h3 className="font-bold text-lg">{lang === "th" ? "ยังไม่มีคำสั่งซื้อ" : "No orders yet"}</h3>
          <Link to="/" className="btn-brand mt-6 text-sm">{t("shopNow", lang)}</Link>
        </div>
      ) : (
        <div className="px-4 py-4 space-y-3">
          {orders.map((o) => (
            <Link key={o.id} to="/order/$id" params={{ id: o.id }} className="block p-4 rounded-[18px] bg-white border border-border">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">#{o.id}</p>
                  <p className="font-bold mt-0.5">{o.items.length} {t("items", lang)}</p>
                </div>
                <span className={`chip ${statusColor[o.status]}`}>{statusLabel[o.status][lang]}</span>
              </div>
              <div className="flex gap-2 mt-3">
                {o.items.slice(0, 4).map((it) => (
                  <div key={it.id} className="w-12 h-12 rounded-[10px] overflow-hidden bg-surface">
                    <img src={it.image} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</span>
                <span className="font-bold">{money(o.total, lang)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
