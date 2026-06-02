import { useRef, useState } from "react";
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
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroIdx, setHeroIdx] = useState(0);

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

  // Hero slideshow: store cover + product images (deduped)
  const heroImages = [...new Set([merchant.cover, ...items.map((p) => p.image)])].slice(0, 6);
  const onHeroScroll = () => {
    const el = heroRef.current;
    if (el) setHeroIdx(Math.round(el.scrollLeft / el.clientWidth));
  };
  const goToHero = (i: number) => {
    const el = heroRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <AppShell bgWhite>
      {/* Hero slideshow */}
      <div className="relative h-40 w-full bg-surface">
        <div
          ref={heroRef}
          onScroll={onHeroScroll}
          className="flex h-full snap-x snap-mandatory overflow-x-auto hide-scrollbar"
        >
          {heroImages.map((src, i) => (
            <div key={i} className="relative h-full w-full shrink-0 snap-center">
              <img src={src} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </div>
          ))}
        </div>

        {heroImages.length > 1 && (
          <>
            <div className="absolute right-3 top-3 rounded-full bg-black/45 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur tabular-nums">
              {heroIdx + 1}/{heroImages.length}
            </div>
            <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToHero(i)}
                  aria-label={`slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === heroIdx ? "w-4 bg-white" : "w-1.5 bg-white/55"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Store header */}
      <div className="px-4">
        <div className="relative z-10 -mt-6 flex items-end gap-3">
          <span className="grid h-[88px] w-[88px] shrink-0 place-items-center rounded-full bg-white ring-[3px] ring-white shadow-[0_8px_24px_-10px_rgba(17,17,17,0.45)]">
            <span className="text-2xl font-bold tracking-tight" style={{ color: merchant.accent }}>
              {merchant.mark}
            </span>
          </span>
          <div className="min-w-0 pb-1">
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
