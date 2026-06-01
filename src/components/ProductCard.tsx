import { Link } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import type { Product } from "@/lib/mock-data";
import { getMerchant } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import { money } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const { lang, wishlist, toggleWishlist } = useStore();
  const liked = wishlist.has(product.id);
  const merchant = getMerchant(product.merchant_id);
  const soldOut =
    Array.isArray(product.variants) &&
    product.variants.length > 0 &&
    product.variants.every((v) => v.stock <= 0);

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group block overflow-hidden rounded-2xl border border-black/[0.04] bg-white shadow-[0_1px_3px_rgba(17,17,17,0.05)]"
    >
      <div className="relative aspect-square overflow-hidden bg-surface">
        <img
          src={product.image}
          alt={product.name[lang]}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {product.isNew && !soldOut && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-foreground shadow-sm backdrop-blur">
            NEW
          </span>
        )}
        {soldOut && (
          <div className="absolute inset-0 grid place-items-center bg-white/55 backdrop-blur-[1px]">
            <span className="rounded-full bg-foreground px-3 py-1.5 text-[11px] font-medium text-white">
              {lang === "th" ? "สินค้าหมด" : "Sold out"}
            </span>
          </div>
        )}
      </div>

      <div className="p-3">
        {merchant && (
          <p className="text-[11px] font-medium text-muted-foreground">{merchant.name[lang]}</p>
        )}
        <h3 className="mt-0.5 line-clamp-2 min-h-[2.6em] text-[13px] font-normal leading-snug text-foreground/75">
          {product.name[lang]}
        </h3>
        <div className="mt-1.5 flex items-end justify-between gap-2">
          <p className="text-[16px] font-bold tracking-tight text-foreground">{money(product.price, lang)}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className="-mb-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-transform active:scale-90"
            aria-label="wishlist"
          >
            <Icon
              name={liked ? "heartFill" : "heart"}
              className={`h-[19px] w-[19px] transition-colors ${liked ? "text-[#FF676C]" : ""}`}
            />
          </button>
        </div>
      </div>
    </Link>
  );
}
