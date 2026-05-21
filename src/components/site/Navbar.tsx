import { Link, useRouterState } from "@tanstack/react-router";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { authStore } from "@/lib/store";

const links: { to: string; key: "nav_home" | "nav_colleges" | "nav_scholarships" | "nav_dashboard" }[] = [
  { to: "/", key: "nav_home" },
  { to: "/eligibility", key: "nav_colleges" },
  { to: "/scholarships", key: "nav_scholarships" },
  { to: "/dashboard", key: "nav_dashboard" },
];

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const [open, setOpen] = useState(false);
  const user = typeof window !== "undefined" ? authStore.get() : null;

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid size-9 place-items-center rounded-xl bg-brand text-brand-foreground shadow-soft">
            <GraduationCap className="size-5" />
          </div>
          <span className="font-display text-lg font-extrabold tracking-tight text-brand">EduPath AI</span>
        </Link>

        <div className="hidden items-center gap-7 text-sm font-medium md:flex">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={active ? "text-brand" : "text-muted-foreground hover:text-brand transition-colors"}
              >
                {t(l.key)}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-bold">
            <button
              onClick={() => setLang("en")}
              className={lang === "en" ? "text-brand" : "text-muted-foreground"}
            >EN</button>
            <span className="text-border">|</span>
            <button
              onClick={() => setLang("ta")}
              className={lang === "ta" ? "text-brand" : "text-muted-foreground"}
            >தமிழ்</button>
          </div>
          {user ? (
            <Link
              to="/dashboard"
              className="hidden sm:inline-flex rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-soft hover:bg-brand-2 transition-colors"
            >
              {user.name.split(" ")[0]}
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-flex rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground shadow-soft hover:bg-brand-2 transition-colors"
            >
              {t("cta_login")}
            </Link>
          )}
          <button
            className="md:hidden grid size-9 place-items-center rounded-lg border border-border"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="flex flex-col gap-1 px-4 py-3 text-sm">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-secondary"
              >
                {t(l.key)}
              </Link>
            ))}
            <Link to="/admin" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-secondary">{t("nav_admin")}</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
