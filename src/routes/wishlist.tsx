import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { AppShell } from "@/components/AppShell";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
});

function WishlistPage() {
  const { lang, products, wishlist } = useStore();
  const items = products.filter((p) => wishlist.has(p.id));

  return (
    <AppShell title={t("wishlist", lang)}>
      {items.length > 0 ? (
        <section className="px-4 py-4">
          <p className="mb-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{items.length}</span> {t("productCount", lang)}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 py-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-surface text-muted-foreground">
            <Icon name="heart" className="h-7 w-7" />
          </span>
          <p className="text-base font-bold">{t("emptyWishlist", lang)}</p>
          <p className="max-w-[260px] text-sm text-muted-foreground">{t("emptyWishlistSub", lang)}</p>
          <Link to="/" className="btn-brand mt-2 text-sm">
            {lang === "th" ? "เริ่มช้อป" : "Start shopping"}
          </Link>
        </div>
      )}
    </AppShell>
  );
}
