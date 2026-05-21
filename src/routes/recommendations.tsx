import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout from "@/components/site/SiteLayout";
import ChanceBadge from "@/components/site/ChanceBadge";
import { profileStore } from "@/lib/store";
import { colleges, calculateChance } from "@/lib/data/colleges";
import { matchScholarships } from "@/lib/data/scholarships";
import { Download, MapPin } from "lucide-react";

export const Route = createFileRoute("/recommendations")({
  head: () => ({ meta: [{ title: "Your College Matches — EduPath AI" }] }),
  component: RecommendationsPage,
});

function downloadPDF(html: string) {
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(`<html><head><title>EduPath AI Report</title>
  <style>body{font-family:Inter,system-ui;padding:32px;color:#111}h1{color:#1E40AF}h2{margin-top:24px}
  table{width:100%;border-collapse:collapse;margin-top:8px}th,td{border:1px solid #e5e7eb;padding:8px;text-align:left;font-size:12px}
  .chip{display:inline-block;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700}</style></head><body>${html}</body></html>`);
  w.document.close();
  setTimeout(() => w.print(), 300);
}

function RecommendationsPage() {
  const profile = typeof window !== "undefined" ? profileStore.get() : null;

  if (!profile) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h1 className="font-display text-2xl font-extrabold">No profile found</h1>
          <p className="mt-2 text-muted-foreground">Fill in the eligibility form first to see your recommendations.</p>
          <Link to="/eligibility" className="mt-6 inline-flex rounded-xl bg-brand px-6 py-3 font-bold text-brand-foreground">Go to Eligibility Form</Link>
        </div>
      </SiteLayout>
    );
  }

  const matched = colleges
    .filter((c) => profile.collegeType === "Any" || c.type === profile.collegeType || (profile.collegeType === "Government" && c.type === "Aided"))
    .filter((c) => c.courses.includes(profile.course as never) || c.courses.length === 0)
    .map((c) => ({ ...c, chance: calculateChance(profile.cutoff, c.cutoff) }))
    .sort((a, b) => ({ High: 0, Medium: 1, Low: 2 }[a.chance] - { High: 0, Medium: 1, Low: 2 }[b.chance]));

  const eligibleScholarships = matchScholarships({
    marks: profile.marks, income: profile.income, category: profile.category,
    gender: profile.gender, religion: profile.religion,
    collegeType: profile.collegeType === "Any" ? "Any" : profile.collegeType,
  });

  const exportReport = () => {
    const html = `
      <h1>EduPath AI Recommendation Report</h1>
      <p><b>${profile.name}</b> · ${profile.district}, ${profile.state} · ${profile.group} · ${profile.marks}% · Cutoff ${profile.cutoff}/200</p>
      <h2>Recommended Colleges (${matched.length})</h2>
      <table><tr><th>College</th><th>Location</th><th>Course</th><th>Chance</th><th>Fees/yr</th><th>NAAC</th></tr>
      ${matched.slice(0, 10).map((c) => `<tr><td>${c.name}</td><td>${c.location}</td><td>${profile.course}</td><td>${c.chance}</td><td>₹${c.fees.toLocaleString()}</td><td>${c.naac}</td></tr>`).join("")}
      </table>
      <h2>Eligible Scholarships (${eligibleScholarships.length})</h2>
      <table><tr><th>Scheme</th><th>Amount</th><th>Last Date</th></tr>
      ${eligibleScholarships.map((s) => `<tr><td>${s.name}</td><td>${s.amount}</td><td>${s.lastDate}</td></tr>`).join("")}
      </table>`;
    downloadPDF(html);
  };

  return (
    <SiteLayout>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase text-brand">Hello {profile.name || "Student"}</p>
              <h1 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Top College Matches</h1>
              <p className="mt-2 text-muted-foreground">Based on your {profile.cutoff}/200 cutoff, {profile.category} category & {profile.course} preference.</p>
            </div>
            <button onClick={exportReport} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold text-brand hover:bg-secondary">
              <Download className="size-4" /> Download Report (PDF)
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {matched.map((c) => (
              <article key={c.id} className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-elegant">
                <img src={c.image} alt={c.name} loading="lazy" width={800} height={400} className="h-40 w-full object-cover" />
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <ChanceBadge chance={c.chance} />
                    <span className="text-xs font-bold text-muted-foreground">NAAC {c.naac}</span>
                  </div>
                  <h3 className="text-lg font-bold leading-tight group-hover:text-brand">{c.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" /> {c.location} · {c.type}
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4 text-xs">
                    <Mini label="Course" value={profile.course} />
                    <Mini label="Cutoff Trend" value={`${c.cutoffTrend[0]} → ${c.cutoffTrend[3]}`} />
                    <Mini label="Fees / yr" value={`₹${c.fees.toLocaleString()}`} />
                    <Mini label="Avg Package" value={c.avgPackage} />
                    <Mini label="Placement" value={c.placement} />
                    <Mini label="Hostel" value={c.hostel ? "Available" : "No"} />
                  </div>
                </div>
              </article>
            ))}

            {/* Scholarship widget */}
            <aside className="flex flex-col rounded-2xl bg-brand p-8 text-brand-foreground shadow-elegant">
              <h3 className="text-xl font-bold">Eligible Scholarships</h3>
              <p className="mt-1 text-sm text-blue-100">{eligibleScholarships.length} schemes match your profile</p>
              <div className="mt-6 flex-1 space-y-3">
                {eligibleScholarships.slice(0, 4).map((s) => (
                  <div key={s.id} className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase text-blue-200">{s.provider}</p>
                    <p className="text-sm font-bold">{s.name}</p>
                    <p className="text-xs text-blue-100">{s.amount}</p>
                  </div>
                ))}
              </div>
              <Link to="/scholarships" className="mt-6 rounded-lg bg-card py-3 text-center font-bold text-brand hover:bg-secondary">
                View all scholarships
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
