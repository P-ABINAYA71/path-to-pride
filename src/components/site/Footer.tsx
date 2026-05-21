import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="size-6 rounded-md bg-brand" />
          <span className="font-display text-lg font-extrabold text-brand">EduPath AI</span>
        </div>
        <p className="text-sm text-muted-foreground">{t("footer_rights")} All rights reserved.</p>
      </div>
    </footer>
  );
}
