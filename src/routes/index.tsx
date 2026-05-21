import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Search, Award, CheckCircle2 } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";
import { useI18n } from "@/lib/i18n";
import heroImg from "@/assets/hero-students.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduPath AI — Find Your College & Scholarship After 12th" },
      { name: "description", content: "AI-powered eligibility check, college recommendations and scholarship matching for 12th standard students in Tamil Nadu." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      {/* Hero */}
      <header className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-2/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-2 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-2" />
                </span>
                {t("hero_badge")}
              </div>
              <h1 className="font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
                {t("hero_title_a")}<span className="text-brand">{t("hero_title_b")}</span>{t("hero_title_c")}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t("hero_sub")}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/eligibility"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-4 font-bold text-brand-foreground shadow-elegant transition-transform hover:-translate-y-1"
                >
                  {t("cta_check")} <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/scholarships"
                  className="inline-flex items-center rounded-xl border border-border bg-card px-7 py-4 font-bold text-foreground hover:bg-secondary"
                >
                  {t("cta_view_scholarships")}
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImg}
                alt="Students using EduPath AI portal"
                width={1200}
                height={900}
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-elegant ring-1 ring-border"
              />
              <div className="absolute -bottom-6 -left-2 sm:-left-6 rounded-2xl bg-card p-5 shadow-elegant ring-1 ring-border">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {["#1E40AF", "#3B82F6", "#60A5FA"].map((c) => (
                      <div key={c} className="size-10 rounded-full border-2 border-card" style={{ background: c }} />
                    ))}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground">{t("trusted_by")}</p>
                    <p className="text-sm font-bold">{t("students_count")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* How it works */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-extrabold">{t("how_title")}</h2>
            <p className="mt-2 text-muted-foreground">Three steps from confusion to confirmation.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Search, title: "Profile", desc: t("step_1") },
              { icon: Sparkles, title: "AI Match", desc: t("step_2") },
              { icon: Award, title: "Apply", desc: t("step_3") },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-border bg-surface p-6">
                <div className="mb-4 grid size-12 place-items-center rounded-xl bg-brand/10 text-brand">
                  <s.icon className="size-6" />
                </div>
                <div className="text-xs font-bold text-muted-foreground">STEP 0{i + 1}</div>
                <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold">Why students choose EduPath AI</h2>
            <p className="mt-3 text-muted-foreground">Built with Tamil Nadu admission data and a friendly bilingual interface.</p>
            <ul className="mt-8 space-y-4">
              {[
                "Real cutoff trends from 500+ TN colleges",
                "Scholarship matching across 10+ government & private schemes",
                "Bilingual (English & Tamil) interface",
                "Save profile, track applications, export PDF report",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                  <span className="text-sm text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Stat value="500+" label="TN colleges" />
            <Stat value="10+" label="Scholarship schemes" />
            <Stat value="98.4%" label="Match accuracy" />
            <Stat value="10K+" label="Students helped" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-10 text-center font-display text-3xl font-extrabold">{t("testimonials")}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Priya R.", from: "Madurai → CEG, Anna University", text: "EduPath helped me see that my 195 cutoff was enough for CSE at CEG. The scholarship section saved me ₹25,000!" },
              { name: "Arun K.", from: "Salem → PSG Tech", text: "I had no clue about cutoff trends. The AI showed me Medium chance at PSG — and I got in." },
              { name: "Fathima S.", from: "Trichy → SSN College", text: "Pragati and Minority scholarships matched automatically. Super easy in Tamil." },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-border bg-surface p-6">
                <p className="text-sm leading-relaxed text-foreground">"{t.text}"</p>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.from}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-3xl bg-brand p-10 text-center text-brand-foreground shadow-elegant">
            <h3 className="font-display text-2xl font-extrabold sm:text-3xl">Ready to find your college?</h3>
            <p className="mx-auto mt-2 max-w-xl text-blue-100">Takes 2 minutes. Free. No spam.</p>
            <Link
              to="/eligibility"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-card px-6 py-3 font-bold text-brand hover:bg-secondary"
            >
              {t("cta_check")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="font-display text-3xl font-extrabold text-brand">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
