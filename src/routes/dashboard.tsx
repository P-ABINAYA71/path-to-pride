import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { profileStore, appsStore, authStore, type EligibilityProfile, type AuthUser } from "@/lib/store";
import { colleges, calculateChance } from "@/lib/data/colleges";
import { scholarships } from "@/lib/data/scholarships";
import { CheckCircle2, GraduationCap, Award, FileText } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Student Dashboard — EduPath AI" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const [profile, setProfile] = useState<EligibilityProfile | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [apps, setApps] = useState<string[]>([]);

  useEffect(() => {
    setProfile(profileStore.get());
    setUser(authStore.get());
    setApps(appsStore.list());
  }, []);

  const matched = profile
    ? colleges
        .map((c) => ({ ...c, chance: calculateChance(profile.cutoff, c.cutoff) }))
        .filter((c) => c.chance !== "Low")
        .slice(0, 5)
    : [];

  const tracked = scholarships.filter((s) => apps.includes(s.id));

  return (
    <SiteLayout>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-2">
            <p className="text-xs font-bold uppercase text-brand">Dashboard</p>
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
              Welcome, {user?.name || profile?.name || "Student"}
            </h1>
            <p className="text-muted-foreground">Manage your profile, recommendations and applications.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Profile card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-xl bg-brand/10 text-brand">
                  <GraduationCap className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">Profile</p>
                  <p className="text-xs text-muted-foreground">{profile ? "Saved" : "Not set up"}</p>
                </div>
              </div>
              {profile ? (
                <dl className="mt-5 space-y-2 text-xs">
                  <Row k="Name" v={profile.name || "—"} />
                  <Row k="District" v={profile.district} />
                  <Row k="Group" v={profile.group} />
                  <Row k="Marks" v={`${profile.marks}%`} />
                  <Row k="Cutoff" v={`${profile.cutoff}/200`} />
                  <Row k="Category" v={profile.category} />
                  <Row k="Preferred Course" v={profile.course} />
                </dl>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">Set up your eligibility profile to see recommendations.</p>
              )}
              <Link to="/eligibility" className="mt-5 inline-flex w-full justify-center rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground hover:bg-brand-2">
                {profile ? "Update Profile" : "Set Up Profile"}
              </Link>
            </div>

            {/* Stats */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Award className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">Quick Stats</p>
                  <p className="text-xs text-muted-foreground">Based on your profile</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Stat value={String(matched.length)} label="College matches" />
                <Stat value={String(tracked.length)} label="Tracking" />
                <Stat value={profile ? `${profile.cutoff}` : "—"} label="Your cutoff" />
                <Stat value={profile ? `${profile.marks}%` : "—"} label="12th marks" />
              </div>
            </div>

            {/* Reports */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-xl bg-amber-100 text-amber-700">
                  <FileText className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">Reports</p>
                  <p className="text-xs text-muted-foreground">Export & share</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Download a printable PDF with your recommended colleges and eligible scholarships.</p>
              <Link to="/recommendations" className="mt-5 inline-flex w-full justify-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-bold hover:bg-secondary">
                Open report
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Section title="Top recommended colleges">
              {matched.length ? matched.map((c) => (
                <li key={c.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
                  <div>
                    <p className="text-sm font-bold">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.location} · NAAC {c.naac}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${c.chance === "High" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{c.chance}</span>
                </li>
              )) : <p className="text-sm text-muted-foreground">No profile yet.</p>}
            </Section>

            <Section title="Tracked applications">
              {tracked.length ? tracked.map((s) => (
                <li key={s.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
                  <div>
                    <p className="text-sm font-bold">{s.name}</p>
                    <p className="text-xs text-muted-foreground">Last date {s.lastDate}</p>
                  </div>
                  <CheckCircle2 className="size-5 text-emerald-600" />
                </li>
              )) : <p className="text-sm text-muted-foreground">Track scholarships from the <Link to="/scholarships" className="text-brand font-bold">Scholarships</Link> page.</p>}
            </Section>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 font-display text-xl font-extrabold">{title}</h2>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between"><dt className="text-muted-foreground">{k}</dt><dd className="font-semibold">{v}</dd></div>;
}
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className="font-display text-xl font-extrabold text-brand">{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}
