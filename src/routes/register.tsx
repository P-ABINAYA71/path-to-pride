import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { authStore } from "@/lib/store";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — EduPath AI" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !pwd) return;
    authStore.set({ email, name, role: "student" });
    navigate({ to: "/eligibility" });
  };

  return (
    <SiteLayout>
      <section className="py-16">
        <div className="mx-auto max-w-md px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h1 className="font-display text-2xl font-extrabold">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Save your profile and track scholarships.</p>
          </div>
          <form onSubmit={submit} className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <Field label="Full Name"><input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Arun Kumar" /></Field>
            <Field label="Email"><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="you@example.com" /></Field>
            <Field label="Password"><input type="password" required value={pwd} onChange={(e) => setPwd(e.target.value)} className={inputCls} placeholder="At least 6 characters" /></Field>
            <button className="w-full rounded-xl bg-brand py-3 font-bold text-brand-foreground hover:bg-brand-2">Create Account</button>
            <p className="text-center text-xs text-muted-foreground">
              Have an account? <Link to="/login" className="font-bold text-brand">Login</Link>
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
