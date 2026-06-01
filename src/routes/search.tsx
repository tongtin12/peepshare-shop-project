import { createFileRoute } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/search")({
  component: SearchPage,
});

function SearchPage() {
  const { lang, products } = useStore();
  const [q, setQ] = useState("");
  const results = q.trim()
    ? products.filter((p) =>
        (p.name.th + p.name.en).toLowerCase().includes(q.toLowerCase()),
      )
    : [];

  return (
    <AppShell title={t("search", lang)}>
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2 bg-surface rounded-2xl px-4 py-3">
          <Icon name="search" className="w-[18px] h-[18px] text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search", lang)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
          {q && (
            <button onClick={() => setQ("")}>
              <Icon name="close" className="w-[18px] h-[18px] text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
      <div className="px-4 pt-4 pb-6">
        {q.trim() === "" ? (
          <div className="text-center py-16 text-muted-foreground">
            <Icon name="search" className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">{lang === "th" ? "เริ่มพิมพ์เพื่อค้นหา" : "Start typing to search"}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground text-sm">{t("noResults", lang)}</div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {results.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </AppShell>
  );
}
