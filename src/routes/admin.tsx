import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { colleges as seedColleges } from "@/lib/data/colleges";
import { scholarships as seedScholarships } from "@/lib/data/scholarships";
import { Pencil, Trash2, Plus, Users, Building2, Award } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — EduPath AI" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [tab, setTab] = useState<"colleges" | "scholarships" | "students">("colleges");
  const [colleges, setColleges] = useState(seedColleges);
  const [scholarships, setScholarships] = useState(seedScholarships);

  const removeCollege = (id: string) => setColleges((cs) => cs.filter((c) => c.id !== id));
  const removeScholarship = (id: string) => setScholarships((cs) => cs.filter((c) => c.id !== id));

  return (
    <SiteLayout>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-brand">Admin</p>
              <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Manage Portal</h1>
            </div>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <KPI icon={Building2} label="Colleges" value={colleges.length} />
            <KPI icon={Award} label="Scholarships" value={scholarships.length} />
            <KPI icon={Users} label="Registered students" value={1247} />
          </div>

          <div className="mb-4 inline-flex rounded-full border border-border bg-card p-1 text-xs font-bold">
            {(["colleges", "scholarships", "students"] as const).map((k) => (
              <button key={k} onClick={() => setTab(k)}
                className={`rounded-full px-4 py-2 capitalize ${tab === k ? "bg-brand text-brand-foreground" : "text-muted-foreground"}`}>
                {k}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card shadow-soft">
            {tab === "colleges" && (
              <Table headers={["Name", "Location", "Type", "Cutoff", "Fees", ""]}>
                {colleges.map((c) => (
                  <tr key={c.id} className="border-t border-border">
                    <Td><span className="font-semibold">{c.name}</span></Td>
                    <Td>{c.location}</Td>
                    <Td>{c.type}</Td>
                    <Td>{c.cutoff}</Td>
                    <Td>₹{c.fees.toLocaleString()}</Td>
                    <Td>
                      <div className="flex justify-end gap-2">
                        <IconBtn><Pencil className="size-3.5" /></IconBtn>
                        <IconBtn onClick={() => removeCollege(c.id)}><Trash2 className="size-3.5" /></IconBtn>
                      </div>
                    </Td>
                  </tr>
                ))}
              </Table>
            )}
            {tab === "scholarships" && (
              <Table headers={["Scheme", "Provider", "Amount", "Min Marks", "Max Income", ""]}>
                {scholarships.map((s) => (
                  <tr key={s.id} className="border-t border-border">
                    <Td><span className="font-semibold">{s.name}</span></Td>
                    <Td>{s.provider}</Td>
                    <Td>{s.amount}</Td>
                    <Td>{s.minMarks}%</Td>
                    <Td>₹{s.maxIncome.toLocaleString()}</Td>
                    <Td>
                      <div className="flex justify-end gap-2">
                        <IconBtn><Pencil className="size-3.5" /></IconBtn>
                        <IconBtn onClick={() => removeScholarship(s.id)}><Trash2 className="size-3.5" /></IconBtn>
                      </div>
                    </Td>
                  </tr>
                ))}
              </Table>
            )}
            {tab === "students" && (
              <Table headers={["Name", "District", "Marks", "Category", "Course"]}>
                {[
                  { n: "Priya R.", d: "Madurai", m: "94%", c: "BC", co: "CSE" },
                  { n: "Arun K.", d: "Salem", m: "87%", c: "MBC", co: "ECE" },
                  { n: "Fathima S.", d: "Trichy", m: "91%", c: "BC", co: "IT" },
                  { n: "Vignesh M.", d: "Chennai", m: "82%", c: "SC", co: "Mechanical" },
                ].map((r) => (
                  <tr key={r.n} className="border-t border-border">
                    <Td><span className="font-semibold">{r.n}</span></Td>
                    <Td>{r.d}</Td><Td>{r.m}</Td><Td>{r.c}</Td><Td>{r.co}</Td>
                  </tr>
                ))}
              </Table>
            )}
          </div>

          <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-brand-foreground hover:bg-brand-2">
            <Plus className="size-4" /> Add new
          </button>
        </div>
      </section>
    </SiteLayout>
  );
}

function KPI({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="grid size-12 place-items-center rounded-xl bg-brand/10 text-brand"><Icon className="size-5" /></div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-display text-2xl font-extrabold">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}
function Table({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-secondary text-left text-xs uppercase text-muted-foreground">
            {headers.map((h, i) => <th key={i} className="px-4 py-3 font-bold">{h}</th>)}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
function Td({ children }: { children: React.ReactNode }) { return <td className="px-4 py-3">{children}</td>; }
function IconBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return <button onClick={onClick} className="grid size-7 place-items-center rounded-md border border-border bg-background text-muted-foreground hover:text-brand hover:border-brand">{children}</button>;
}
