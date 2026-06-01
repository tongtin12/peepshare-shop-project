import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { useStore } from "@/lib/store";

export function TopBar({ title, showBack = true }: { title?: string; showBack?: boolean }) {
  const router = useRouter();
  const { cart } = useStore();
  const location = useLocation();
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-40 bg-white/75 backdrop-blur-xl border-b border-border/60">
      <div className="flex items-center gap-2 px-3 h-14">
        {isHome ? (
          <Link to="/" className="flex items-center gap-2 pl-0.5" aria-label="PEEP SHOP home">
            <span className="grid place-items-center w-8 h-8 rounded-[11px] bg-brand text-white shadow-[0_5px_14px_-3px_rgba(255,103,108,0.55)]">
              <Icon name="bagFill" className="w-[18px] h-[18px]" />
            </span>
            <span className="font-bold tracking-tight text-[15px] leading-none">
              PEEP<span className="text-brand">SHOP</span>
            </span>
          </Link>
        ) : showBack ? (
          <button
            onClick={() => router.history.back()}
            className="grid place-items-center w-9 h-9 -ml-1.5 rounded-full active:bg-surface transition-colors"
            aria-label="back"
          >
            <Icon name="back" className="w-6 h-6" />
          </button>
        ) : (
          <span className="w-8" />
        )}

        {!isHome && (
          <h1 className="flex-1 text-left text-[15px] font-bold tracking-tight truncate pl-1">
            {title ?? "PEEP SHOP"}
          </h1>
        )}
        {isHome && <span className="flex-1" />}

        <div className="flex items-center gap-1">
          <Link
            to="/wishlist"
            className="relative grid place-items-center w-9 h-9 rounded-full active:bg-surface transition-colors"
            aria-label="wishlist"
          >
            <Icon name="heart" className="w-[23px] h-[23px]" />
          </Link>

          <Link
            to="/cart"
            className="relative grid place-items-center w-9 h-9 rounded-full active:bg-surface transition-colors"
            aria-label="cart"
          >
            <Icon name="bag" className="w-[23px] h-[23px]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-0.5 min-w-[17px] h-[17px] rounded-full bg-brand text-white text-[10px] font-bold grid place-items-center px-1 ring-2 ring-white tabular-nums">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => router.history.back()}
            className="grid place-items-center w-9 h-9 rounded-full active:bg-surface transition-colors"
            aria-label="close"
          >
            <Icon name="close" className="w-[23px] h-[23px]" />
          </button>
        </div>
      </div>
    </header>
  );
}
