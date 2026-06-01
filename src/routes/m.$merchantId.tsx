import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { AppShell } from "@/components/AppShell";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/lib/store";
import { categories, getMerchant } from "@/lib/mock-data";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/m/$merchantId")({
  component: StorePage,
});

type Tab = "products" | "categories";

function StorePage() {
  const { merchantId } = Route.useParams();
  const { lang, products } = useStore();
  const merchant = getMerchant(merchantId);
  const [tab, setTab] = useState<Tab>("products");

  if (!merchant) {
    return (
      <AppShell title="Store">
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
          <p className="text-base font-bold">{lang === "th" ? "ไม่พบร้านค้านี้" : "Store not found"}</p>
          <Link to="/" className="btn-brand text-sm">
            {lang === "th" ? "กลับหน้าหลัก" : "Back home"}
          </Link>
        </div>
      </AppShell>
    );
  }

  const items = products.filter((p) => p.merchant_id === merchant.id);
  const groups = categories
    .map((c) => ({ category: c, list: items.filter((p) => p.category === c.id) }))
    .filter((g) => g.list.length > 0);

  return (
    <AppShell>
      {/* Store header */}
      <div className="px-4 pt-5">
        <div className="flex items-center gap-4">
          <span className="grid h-[88px] w-[88px] shrink-0 place-items-center rounded-full bg-white ring-1 ring-border shadow-[0_6px_20px_-10px_rgba(17,17,17,0.35)]">
            <span className="text-2xl font-bold tracking-tight" style={{ color: merchant.accent }}>
              {merchant.mark}
            </span>
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="truncate text-2xl font-bold leading-none">{merchant.name[lang]}</h1>
              {merchant.verified && (
                <Icon name="verified" className="h-5 w-5 shrink-0 text-brand-end" />
              )}
            </div>
            <p className="mt-1.5 truncate text-sm text-muted-foreground">{merchant.handle}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-foreground/80">{merchant.tagline[lang]}</p>

        <div className="mt-3 text-sm text-muted-foreground">
          <span className="font-bold text-foreground">{items.length}</span> {t("productCount", lang)}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-surface text-muted-foreground">
            <Icon name="box" className="h-7 w-7" />
          </span>
          <p className="text-base font-bold">{t("storeComingSoon", lang)}</p>
          <p className="max-w-[260px] text-sm text-muted-foreground">{t("storeComingSoonSub", lang)}</p>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="sticky top-14 z-30 mt-5 bg-white/90 backdrop-blur-xl border-b border-border">
            <div className="flex px-4">
              {(
                [
                  { id: "products", label: t("allProducts", lang) },
                  { id: "categories", label: t("categories", lang) },
                ] as const
              ).map((tb) => (
                <button
                  key={tb.id}
                  onClick={() => setTab(tb.id)}
                  className="relative mr-7 py-3.5 text-sm transition-colors"
                  aria-pressed={tab === tb.id}
                >
                  <span className={tab === tb.id ? "font-bold text-foreground" : "font-medium text-muted-foreground"}>
                    {tb.label}
                  </span>
                  {tab === tb.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-foreground" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <section className="px-4 pb-6 pt-3">
            {tab === "products" ? (
              <div className="grid grid-cols-2 gap-3">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <ul className="overflow-hidden rounded-2xl border border-border bg-white">
                {groups.map((g) => (
                  <li key={g.category.id}>
                    <Link
                      to="/category/$id"
                      params={{ id: g.category.id }}
                      className="flex items-center gap-3 px-3 py-3 transition-colors active:bg-surface border-b border-border last:border-0"
                    >
                      <span className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-surface">
                        <img src={g.category.image} alt="" className="h-full w-full object-cover" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block truncate text-sm font-semibold">{g.category.name[lang]}</span>
                        <span className="block text-xs text-muted-foreground">
                          {g.list.length} {t("productCount", lang)}
                        </span>
                      </span>
                      <Icon name="chevronRight" className="h-5 w-5 shrink-0 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </AppShell>
  );
}
