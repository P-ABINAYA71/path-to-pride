import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { profileStore, type EligibilityProfile } from "@/lib/store";

export const Route = createFileRoute("/eligibility")({
  head: () => ({
    meta: [
      { title: "Check Eligibility — EduPath AI" },
      { name: "description", content: "Enter your 12th marks, category and preferences to get college and scholarship recommendations." },
    ],
  }),
  component: EligibilityPage,
});

const TN_DISTRICTS = ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tirunelveli", "Kanyakumari", "Vellore", "Erode", "Thanjavur", "Kancheepuram"];
const COURSES = ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil", "Medical", "Arts", "Commerce", "BBA"];

function EligibilityPage() {
  const navigate = useNavigate();
  const existing = typeof window !== "undefined" ? profileStore.get() : null;
  const [form, setForm] = useState<EligibilityProfile>(existing ?? {
    name: "",
    gender: "Male",
    state: "Tamil Nadu",
    district: "Chennai",
    board: "State Board",
    group: "Computer Science",
    marks: 90,
    cutoff: 185,
    category: "BC",
    religion: "Hindu",
    income: 250000,
    course: "CSE",
    collegeType: "Any",
  });

  const update = <K extends keyof EligibilityProfile>(k: K, v: EligibilityProfile[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    profileStore.set(form);
    navigate({ to: "/recommendations" });
  };

  return (
    <SiteLayout>
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Smart Eligibility Profiler</h1>
            <p className="mt-2 text-muted-foreground">Fill in your academic profile to generate AI recommendations.</p>
          </div>

          <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Student Name">
                <input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Arun Kumar" className={inputCls} />
              </Field>
              <Field label="Gender">
                <select value={form.gender} onChange={(e) => update("gender", e.target.value as "Male" | "Female")} className={inputCls}>
                  <option>Male</option><option>Female</option>
                </select>
              </Field>
              <Field label="State">
                <input value={form.state} onChange={(e) => update("state", e.target.value)} className={inputCls} />
              </Field>
              <Field label="District">
                <select value={form.district} onChange={(e) => update("district", e.target.value)} className={inputCls}>
                  {TN_DISTRICTS.map((d) => <option key={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="12th Board">
                <select value={form.board} onChange={(e) => update("board", e.target.value as EligibilityProfile["board"])} className={inputCls}>
                  <option>State Board</option><option>CBSE</option><option>ICSE</option>
                </select>
              </Field>
              <Field label="Group">
                <select value={form.group} onChange={(e) => update("group", e.target.value as EligibilityProfile["group"])} className={inputCls}>
                  <option>Computer Science</option><option>Biology</option><option>Commerce</option><option>Arts</option>
                </select>
              </Field>
              <Field label="12th Marks (%)">
                <input type="number" min={0} max={100} value={form.marks} onChange={(e) => update("marks", Number(e.target.value))} className={inputCls} />
              </Field>
              <Field label="Cutoff Marks (out of 200)">
                <input type="number" min={0} max={200} step="0.5" value={form.cutoff} onChange={(e) => update("cutoff", Number(e.target.value))} className={inputCls} />
              </Field>
              <Field label="Caste Category">
                <select value={form.category} onChange={(e) => update("category", e.target.value as EligibilityProfile["category"])} className={inputCls}>
                  <option>OC</option><option>BC</option><option>MBC</option><option>SC</option><option>ST</option>
                </select>
              </Field>
              <Field label="Religion">
                <select value={form.religion} onChange={(e) => update("religion", e.target.value)} className={inputCls}>
                  <option>Hindu</option><option>Muslim</option><option>Christian</option><option>Sikh</option><option>Other</option>
                </select>
              </Field>
              <Field label="Family Income (₹/yr)">
                <input type="number" min={0} value={form.income} onChange={(e) => update("income", Number(e.target.value))} className={inputCls} />
              </Field>
              <Field label="Preferred Course">
                <select value={form.course} onChange={(e) => update("course", e.target.value)} className={inputCls}>
                  {COURSES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="College Type">
                <select value={form.collegeType} onChange={(e) => update("collegeType", e.target.value as EligibilityProfile["collegeType"])} className={inputCls}>
                  <option>Any</option><option>Government</option><option>Private</option>
                </select>
              </Field>
            </div>
            <button type="submit" className="mt-8 w-full rounded-xl bg-brand py-4 font-bold text-brand-foreground shadow-elegant transition-colors hover:bg-brand-2">
              Generate Recommendations
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

const inputCls = "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
