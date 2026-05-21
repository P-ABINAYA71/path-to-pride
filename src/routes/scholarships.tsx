import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { scholarships, matchScholarships } from "@/lib/data/scholarships";
import { profileStore, appsStore } from "@/lib/store";
import { Calendar, ExternalLink, BookmarkPlus, BookmarkCheck } from "lucide-react";

export const Route = createFileRoute("/scholarships")({
  head: () => ({
    meta: [
      { title: "Scholarships — EduPath AI" },
      { name: "description", content: "Government and private scholarships for Tamil Nadu students after 12th." },
    ],
  }),
  component: ScholarshipsPage,
});

function ScholarshipsPage() {
  const profile = typeof window !== "undefined" ? profileStore.get() : null;
  const [filter, setFilter] = useState<"matched" | "all">(profile ? "matched" : "all");
  const [apps, setApps] = useState<string[]>(typeof window !== "undefined" ? appsStore.list() : []);

  const list = filter === "matched" && profile
    ? matchScholarships({
        marks: profile.marks, income: profile.income, category: profile.category,
        gender: profile.gender, religion: profile.religion,
        collegeType: profile.collegeType === "Any" ? "Any" : profile.collegeType,
      })
    : scholarships;

  return (
    <SiteLayout>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Scholarships</h1>
              <p className="mt-2 text-muted-foreground">Government & private grants for Tamil Nadu students.</p>
            </div>
            <div className="inline-flex rounded-full border border-border bg-card p-1 text-xs font-bold">
              <button
                onClick={() => setFilter("matched")}
                className={`rounded-full px-4 py-2 ${filter === "matched" ? "bg-brand text-brand-foreground" : "text-muted-foreground"}`}
              >Matched ({profile ? matchScholarships({ marks: profile.marks, income: profile.income, category: profile.category, gender: profile.gender, religion: profile.religion, collegeType: profile.collegeType === "Any" ? "Any" : profile.collegeType }).length : 0})</button>
              <button
                onClick={() => setFilter("all")}
                className={`rounded-full px-4 py-2 ${filter === "all" ? "bg-brand text-brand-foreground" : "text-muted-foreground"}`}
              >All ({scholarships.length})</button>
            </div>
          </div>

          {!profile && filter === "matched" && (
            <div className="mb-6 rounded-2xl border border-border bg-card p-6 text-sm">
              Fill the <Link to="/eligibility" className="font-bold text-brand">eligibility form</Link> to see scholarships matched to your profile.
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => {
              const saved = apps.includes(s.id);
              return (
                <article key={s.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <p className="text-[10px] font-bold uppercase text-brand">{s.provider}</p>
                  <h3 className="mt-1 text-lg font-bold leading-tight">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                  <div className="my-4 border-t border-border" />
                  <dl className="space-y-2 text-xs">
                    <Row k="Amount" v={s.amount} />
                    <Row k="Min Marks" v={`${s.minMarks}%`} />
                    <Row k="Max Income" v={`₹${s.maxIncome.toLocaleString()}`} />
                    <Row k="Categories" v={s.categories.join(", ")} />
                    <Row k="Documents" v={s.documents.slice(0, 3).join(", ")} />
                  </dl>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Calendar className="size-3.5" /> {s.lastDate}</span>
                    <button
                      onClick={() => setApps(appsStore.toggle(s.id))}
                      className="inline-flex items-center gap-1 font-bold text-brand"
                    >
                      {saved ? <><BookmarkCheck className="size-4" /> Tracking</> : <><BookmarkPlus className="size-4" /> Track</>}
                    </button>
                  </div>
                  <a
                    href={s.applyUrl}
                    target="_blank" rel="noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-brand-foreground hover:bg-brand-2"
                  >
                    Apply Now <ExternalLink className="size-4" />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-semibold text-right">{v}</dd>
    </div>
  );
}
