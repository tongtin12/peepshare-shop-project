import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { AppShell } from "@/components/AppShell";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/order/$id/success")({
  component: SuccessPage,
});

function SuccessPage() {
  const { id } = Route.useParams();
  const { lang } = useStore();
  return (
    <AppShell title={t("orderPlaced", lang)}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-brand flex items-center justify-center mb-5">
          <Icon name="checkCircle" className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-xl font-bold">{t("orderPlaced", lang)}</h2>
        <p className="text-sm text-muted-foreground mt-1">{t("orderNumber", lang)}</p>
        <p className="text-lg font-bold mt-1">#{id}</p>
        <div className="mt-8 flex flex-col gap-2 w-full">
          <Link to="/order/$id" params={{ id }} className="btn-brand">{t("viewOrder", lang)}</Link>
          <Link to="/" className="btn-outline">{t("home", lang)}</Link>
        </div>
      </div>
    </AppShell>
  );
}
