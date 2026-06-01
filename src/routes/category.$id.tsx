import { createFileRoute } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { AppShell } from "@/components/AppShell";
import { ProductCard } from "@/components/ProductCard";
import { categories } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/category/$id")({
  component: CategoryPage,
});

function CategoryPage() {
  const { id } = Route.useParams();
  const { lang, products } = useStore();
  const cat = categories.find((c) => c.id === id);
  const items = products.filter((p) => p.category === id);

  return (
    <AppShell title={cat?.name[lang] ?? "Category"}>
      <div className="px-4 pt-3 pb-2 flex gap-2">
        <button className="flex-1 chip border border-border bg-white justify-center">
          <Icon name="filter" className="w-4 h-4" />
          {t("filters", lang)}
        </button>
        <button className="flex-1 chip border border-border bg-white justify-center">
          <Icon name="sort" className="w-4 h-4" />
          {t("sort", lang)}
        </button>
      </div>
      <div className="px-4 pt-3 pb-6 grid grid-cols-2 gap-3">
        {items.length === 0 ? (
          <p className="col-span-2 text-center text-muted-foreground py-10 text-sm">{t("noResults", lang)}</p>
        ) : items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </AppShell>
  );
}
