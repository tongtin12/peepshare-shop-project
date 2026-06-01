import { Link, useLocation } from "@tanstack/react-router";
import { Icon, type IconName } from "@/components/Icon";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";

export function BottomNav() {
  const { cart, lang } = useStore();
  const loc = useLocation();
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  const items = [
    { to: "/", icon: "home" as IconName, iconActive: "homeFill" as IconName, label: t("home", lang), match: (p: string) => p === "/" },
    { to: "/categories", icon: "grid" as IconName, iconActive: "gridFill" as IconName, label: t("categories", lang), match: (p: string) => p.startsWith("/categories") || p.startsWith("/category") },
    { to: "/cart", icon: "bag" as IconName, iconActive: "bagFill" as IconName, label: t("cart", lang), match: (p: string) => p === "/cart", badge: cartCount },
    { to: "/orders", icon: "receipt" as IconName, iconActive: "receiptFill" as IconName, label: t("orders", lang), match: (p: string) => p.startsWith("/order") },
  ] as const;

  return (
    <nav className="sticky bottom-0 z-40 bg-white/95 backdrop-blur border-t border-border">
      <ul className="grid grid-cols-4 h-16">
        {items.map((it) => {
          const active = it.match(loc.pathname);
          return (
            <li key={it.to}>
              <Link to={it.to} className="flex flex-col items-center justify-center gap-1 h-full relative">
                <div className="relative grid place-items-center w-11 h-7 rounded-full">
                  {active && <span className="absolute inset-0 rounded-full bg-[oklch(0.72_0.18_35_/_0.12)]" />}
                  <Icon
                    name={active ? it.iconActive : it.icon}
                    className={`relative w-[22px] h-[22px] ${active ? "text-brand-end" : "text-muted-foreground"}`}
                  />
                  {"badge" in it && it.badge ? (
                    <span className="absolute -top-1 -right-0.5 min-w-[16px] h-4 rounded-full bg-brand text-white text-[9px] font-bold flex items-center justify-center px-1 ring-2 ring-white">
                      {it.badge}
                    </span>
                  ) : null}
                </div>
                <span className={`text-[10px] ${active ? "font-bold text-foreground" : "text-muted-foreground"}`}>{it.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
