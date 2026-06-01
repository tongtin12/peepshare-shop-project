import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useStore } from "@/lib/store";
import { getMerchant } from "@/lib/mock-data";
import { t } from "@/lib/i18n";
import { money } from "@/lib/format";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const { lang, products, addToCart, wishlist, toggleWishlist } = useStore();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  const galleryRef = useRef<HTMLDivElement>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState<string | undefined>(product?.sizes[0]);
  const [color, setColor] = useState(product?.colors[0]);
  const [style, setStyle] = useState(product?.styles[0]);
  const [qty, setQty] = useState(1);

  const stock = useMemo(() => {
    if (!product) return 0;
    const v = product.variants.find((vv) => vv.size === size && vv.color?.hex === color?.hex);
    return v?.stock ?? 5;
  }, [product, size, color]);

  if (!product) return <AppShell><div className="p-6">Not found</div></AppShell>;
  const liked = wishlist.has(product.id);
  const merchant = getMerchant(product.merchant_id);
  const merchantItems = products.filter((p) => p.merchant_id === product.merchant_id).length;

  const handleScroll = () => {
    const el = galleryRef.current;
    if (!el) return;
    setImgIdx(Math.round(el.scrollLeft / el.clientWidth));
  };
  const goTo = (i: number) => {
    const el = galleryRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const handleAdd = (buyNow = false) => {
    addToCart({
      id: `${product.id}-${size}-${color?.hex}-${style?.en}`,
      productId: product.id,
      merchant_id: product.merchant_id,
      name: product.name,
      image: product.image,
      price: product.price,
      size,
      color,
      style,
      qty,
    });
    if (buyNow) navigate({ to: "/cart" });
  };

  return (
    <AppShell bgWhite>
      {/* Gallery slider */}
      <div className="relative bg-surface">
        <div
          ref={galleryRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory overflow-x-auto hide-scrollbar"
        >
          {product.images.map((src, i) => (
            <div key={i} className="aspect-square w-full shrink-0 snap-center">
              <img
                src={src}
                alt={`${product.name[lang]} ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Image counter */}
        <div className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur tabular-nums">
          {imgIdx + 1}/{product.images.length}
        </div>

        {/* Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === imgIdx ? "w-4 bg-white" : "w-1.5 bg-white/55"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Title + price */}
      <div className="px-4 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-bold leading-snug">{product.name[lang]}</h2>
          <button
            onClick={() => toggleWishlist(product.id)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border transition-transform active:scale-90"
            aria-label="wishlist"
          >
            <Icon name={liked ? "heartFill" : "heart"} className={`h-5 w-5 ${liked ? "text-[#FF676C]" : ""}`} />
          </button>
        </div>
        <p className="mt-1.5 text-2xl font-bold text-foreground">{money(product.price, lang)}</p>
      </div>

      {/* Store row */}
      {merchant && (
        <Link
          to="/m/$merchantId"
          params={{ merchantId: merchant.id }}
          className="mx-4 mt-4 flex items-center gap-3 rounded-2xl border border-border p-3 transition-colors active:bg-surface"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white ring-1 ring-border">
            <span className="text-sm font-bold tracking-tight" style={{ color: merchant.accent }}>
              {merchant.mark}
            </span>
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span className="truncate text-sm font-semibold">{merchant.name[lang]}</span>
              {merchant.verified && (
                <Icon name="verified" className="h-4 w-4 shrink-0 text-brand-end" />
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {merchantItems} {t("productCount", lang)}
            </span>
          </div>
          <span className="flex items-center gap-0.5 text-xs font-semibold text-brand-end">
            {lang === "th" ? "ไปที่ร้าน" : "Go to shop"}
            <Icon name="chevronRight" className="h-4 w-4" />
          </span>
        </Link>
      )}

      {/* Size */}
      <div className="px-4 pt-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("size", lang)}</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`h-11 min-w-11 rounded-full border px-4 text-sm font-semibold transition ${
                size === s ? "border-foreground bg-foreground text-white" : "border-border bg-white text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="px-4 pt-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {t("color", lang)}: <span className="normal-case text-foreground">{color?.name[lang]}</span>
        </p>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((c) => (
            <button
              key={c.hex}
              onClick={() => setColor(c)}
              style={{ background: c.hex }}
              className={`h-9 w-9 rounded-full border-2 ${
                color?.hex === c.hex ? "ring-2 ring-foreground ring-offset-2" : "border-border"
              }`}
              aria-label={c.name[lang]}
            />
          ))}
        </div>
      </div>

      {/* Style */}
      <div className="px-4 pt-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("style", lang)}</p>
        <div className="flex flex-wrap gap-2">
          {product.styles.map((s) => (
            <button
              key={s.en}
              onClick={() => setStyle(s)}
              className={`chip ${style?.en === s.en ? "chip-brand" : "border border-border bg-white"}`}
            >
              {s[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Qty */}
      <div className="flex items-center justify-between px-4 pt-5">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("qty", lang)}</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="grid h-8 w-8 place-items-center text-foreground transition-transform active:scale-90"
          >
            <Icon name="minus" className="h-6 w-6" />
          </button>
          <span className="w-6 text-center font-bold">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="grid h-8 w-8 place-items-center text-foreground transition-transform active:scale-90"
          >
            <Icon name="plus" className="h-6 w-6" />
          </button>
        </div>
      </div>

      <p className="px-4 pt-3 text-xs text-muted-foreground">
        {stock > 0 ? `${stock} ${lang === "th" ? "ชิ้นในสต๊อก" : "in stock"}` : t("outOfStock", lang)}
      </p>

      {/* Description */}
      <div className="px-4 pt-6">
        <h3 className="mb-2 text-base font-bold">{lang === "th" ? "รายละเอียดสินค้า" : "Description"}</h3>
        <p className="text-sm leading-relaxed text-foreground/75">{product.description[lang]}</p>
      </div>

      {/* Sticky actions */}
      <div className="sticky bottom-0 mt-6 flex gap-2 border-t border-border bg-white p-4">
        <button onClick={() => handleAdd(false)} disabled={stock === 0} className="btn-outline flex-1 disabled:opacity-50">
          {t("addToCart", lang)}
        </button>
        <button onClick={() => handleAdd(true)} disabled={stock === 0} className="btn-brand flex-1 disabled:opacity-50">
          {t("buyNow", lang)}
        </button>
      </div>
    </AppShell>
  );
}
