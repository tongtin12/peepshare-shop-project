import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { AppShell } from "@/components/AppShell";
import { ProductCard } from "@/components/ProductCard";
import { BrandRail } from "@/components/BrandRail";
import { useStore } from "@/lib/store";
import { banner } from "@/lib/mock-data";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "PEEP SHOP" }],
  }),
  component: Index,
});

function Index() {
  const { lang, products } = useStore();
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <AppShell showBack={false}>
      {/* Search */}
      <div className="px-4 pt-3 pb-1">
        <Link
          to="/search"
          className="flex items-center gap-2.5 bg-white rounded-full pl-4 pr-1.5 py-1.5 text-muted-foreground text-sm border border-border shadow-[0_2px_10px_-6px_rgba(17,17,17,0.25)]"
        >
          <Icon name="search" className="w-[18px] h-[18px] shrink-0" />
          <span className="flex-1 truncate">{t("search", lang)}</span>
          <span className="grid place-items-center w-9 h-9 rounded-full bg-brand text-white shrink-0">
            <Icon name="search" className="w-[18px] h-[18px]" />
          </span>
        </Link>
      </div>

      {/* Promo banner */}
      <div className="px-4 pt-3">
        <div className="relative overflow-hidden rounded-[20px] aspect-[16/9] shadow-[0_14px_30px_-18px_rgba(17,17,17,0.5)]">
          <img src={banner.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
          <div className="absolute inset-0 p-5 flex flex-col justify-center">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/80 font-bold">PROMO</p>
            <h2 className="text-white text-2xl font-bold leading-tight text-balance">{banner.title[lang]}</h2>
            <p className="text-white/90 text-xs mt-1">{banner.subtitle[lang]}</p>
            <button className="mt-3 self-start btn-brand text-xs py-2 px-4">{t("shopNow", lang)}</button>
          </div>
        </div>
      </div>

      {/* Shop by brand */}
      <section className="pt-6">
        <div className="px-4">
          <SectionHead title={t("shopByBrand", lang)} />
        </div>
        <div className="mt-3">
          <BrandRail />
        </div>
      </section>

      {/* New Arrivals */}
      <section className="px-4 pt-7 pb-6">
        <SectionHead
          title={t("newArrivals", lang)}
          action={
            <Link to="/categories" className="flex items-center gap-0.5 text-xs font-semibold text-muted-foreground">
              {lang === "th" ? "ดูทั้งหมด" : "View all"}
              <Icon name="chevronRight" className="w-4 h-4" />
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-3 mt-3">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function SectionHead({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-brand" />
        <h3 className="text-base font-bold">{title}</h3>
      </div>
      {action}
    </div>
  );
}
