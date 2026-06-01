import { Link } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { merchants } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export function BrandRail() {
  const { lang } = useStore();

  return (
    <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4 pb-1">
      {merchants.map((m) => (
        <Link
          key={m.id}
          to="/m/$merchantId"
          params={{ merchantId: m.id }}
          className="group flex w-[64px] shrink-0 flex-col items-center gap-2"
        >
          <span className="relative">
            <span className="lift grid h-16 w-16 place-items-center rounded-full bg-white border border-border shadow-[0_3px_14px_-6px_rgba(17,17,17,0.32)]">
              <span className="font-bold text-[15px] tracking-tight" style={{ color: m.accent }}>
                {m.mark}
              </span>
            </span>
            {m.verified && (
              <span className="absolute -bottom-0.5 -right-0.5 grid h-[18px] w-[18px] place-items-center rounded-full bg-white">
                <Icon name="verified" className="h-[18px] w-[18px] text-brand-end" />
              </span>
            )}
          </span>
          <span className="w-full truncate text-center text-[11px] font-medium text-foreground/80">
            {m.name[lang]}
          </span>
        </Link>
      ))}
    </div>
  );
}
