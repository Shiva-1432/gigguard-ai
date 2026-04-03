"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PLANS, saveRegistration, type PlanTier, type RegistrationData } from "../lib/gigguard";

const DEFAULT_PLAN: PlanTier = "Standard";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegistrationData>({
    name: "",
    contact: "",
    upi: "",
    plan: DEFAULT_PLAN,
  });
  const [error, setError] = useState("");

  const cleanedForm: RegistrationData = {
    ...form,
    name: form.name.trim(),
    contact: form.contact.trim(),
    upi: form.upi.trim(),
  };

  const isValid =
    cleanedForm.name.length > 0 &&
    cleanedForm.contact.length > 0 &&
    cleanedForm.upi.includes("@");

  const handleContinue = () => {
    if (!isValid) {
      setError("Please enter name, phone/email, and a valid UPI ID.");
      return;
    }

    setError("");
    saveRegistration(cleanedForm);
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_18%_18%,#0f3057_0%,#020617_40%,#020617_100%)] px-4 py-8 text-white sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-4xl border border-white/10 bg-white/5 p-6 shadow-[0_24px_70px_rgba(34,211,238,0.2)] backdrop-blur sm:p-7">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300">GigGuard AI</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">Register for income protection</h1>
          <p className="mt-2 text-sm text-slate-300">Create your profile, select a plan, and continue to the dashboard.</p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-200">Name</span>
            <input
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:bg-white/10"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Enter your full name"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-200">Phone / Email</span>
            <input
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:bg-white/10"
              value={form.contact}
              onChange={(event) => setForm({ ...form, contact: event.target.value })}
              placeholder="Enter phone or email"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-200">UPI ID</span>
            <input
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:bg-white/10"
              value={form.upi}
              onChange={(event) => setForm({ ...form, upi: event.target.value })}
              placeholder="Enter your UPI ID"
            />
          </label>
        </div>

        <section>
          <p className="mb-3 text-sm font-semibold text-slate-200">Select Plan</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {(["Basic", "Standard", "Pro"] as PlanTier[]).map((plan) => {
              const selected = form.plan === plan;
              return (
                <button
                  key={plan}
                  type="button"
                  onClick={() => setForm({ ...form, plan })}
                  className={`rounded-2xl border px-3 py-4 text-left transition ${selected ? "border-cyan-300/70 bg-cyan-300/15 ring-2 ring-cyan-300/30" : "border-white/15 bg-white/5 hover:border-cyan-300/40 hover:bg-white/10"}`}
                >
                  <div className="text-sm font-bold text-slate-100">{plan}</div>
                  <div className="mt-1 text-lg font-black text-cyan-200">₹{PLANS[plan].premium}</div>
                </button>
              );
            })}
          </div>
        </section>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!isValid}
          className="cta-shimmer rounded-3xl bg-linear-to-r from-cyan-400 to-sky-500 px-5 py-4 text-sm font-black text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Continue
        </button>

        {error && <p className="rounded-2xl border border-red-300/40 bg-red-300/10 px-4 py-3 text-center text-sm font-semibold text-red-200">{error}</p>}
      </div>
    </main>
  );
}