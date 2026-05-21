import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { authStore } from "@/lib/store";
import { GraduationCap } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — EduPath AI" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [role, setRole] = useState<"student" | "admin">("student");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pwd) return;
    authStore.set({ email, name: email.split("@")[0], role });
    navigate({ to: role === "admin" ? "/admin" : "/dashboard" });
  };

  return (
    <SiteLayout>
      <section className="py-16">
        <div className="mx-auto max-w-md px-4 sm:px-6">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-brand text-brand-foreground"><GraduationCap className="size-6" /></div>
            <h1 className="font-display text-2xl font-extrabold">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to continue to your dashboard.</p>
          </div>
          <form onSubmit={submit} className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <div className="inline-flex w-full rounded-full bg-secondary p-1 text-xs font-bold">
              <button type="button" onClick={() => setRole("student")} className={`flex-1 rounded-full py-2 ${role === "student" ? "bg-card text-brand shadow" : "text-muted-foreground"}`}>Student</button>
              <button type="button" onClick={() => setRole("admin")} className={`flex-1 rounded-full py-2 ${role === "admin" ? "bg-card text-brand shadow" : "text-muted-foreground"}`}>Admin</button>
            </div>
            <Field label="Email">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="you@example.com" />
            </Field>
            <Field label="Password">
              <input type="password" required value={pwd} onChange={(e) => setPwd(e.target.value)} className={inputCls} placeholder="••••••••" />
            </Field>
            <button type="submit" className="w-full rounded-xl bg-brand py-3 font-bold text-brand-foreground hover:bg-brand-2">Sign In</button>
            <p className="text-center text-xs text-muted-foreground">
              Don't have an account? <Link to="/register" className="font-bold text-brand">Register</Link>
            </p>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

const inputCls = "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><label className="text-xs font-bold uppercase text-muted-foreground">{label}</label>{children}</div>;
}
