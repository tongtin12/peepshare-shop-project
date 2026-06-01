import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { categories } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/categories")({
  component: CategoriesPage,
});

function CategoriesPage() {
  const { lang } = useStore();
  return (
    <AppShell title={t("categories", lang)}>
      <div className="space-y-3 px-4 py-4">
        {categories.map((c) => (
          <Link
            key={c.id}
            to="/category/$id"
            params={{ id: c.id }}
            className="group relative block aspect-[16/7] overflow-hidden rounded-2xl lift"
          >
            <img
              src={c.image}
              alt={c.name[lang]}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h3 className="text-xl font-bold text-white">{c.name[lang]}</h3>
              <p className="mt-0.5 text-xs text-white/85">
                {c.count} {t("productCount", lang)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
