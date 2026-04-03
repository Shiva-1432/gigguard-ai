"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { hasActiveRegistrationSession, isRegistrationComplete, loadRegistration } from "./lib/gigguard";

const subscribe = () => () => {};

export default function Home() {
  const router = useRouter();
  const isLoggedIn = useSyncExternalStore(
    subscribe,
    () => {
      const registration = loadRegistration();
      const hasSession = hasActiveRegistrationSession();
      return hasSession && isRegistrationComplete(registration);
    },
    () => false
  );

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/dashboard");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_18%_18%,#0f3057_0%,#020617_36%,#020617_100%)] px-4 py-8 text-white sm:px-6 sm:py-12">
      <section className="hero-fade relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2.25rem] border border-cyan-300/20 bg-slate-950/65 shadow-[0_40px_120px_rgba(8,145,178,0.25)] backdrop-blur">
        <div className="hero-glow hero-glow-a" aria-hidden="true" />
        <div className="hero-glow hero-glow-b" aria-hidden="true" />
        <div className="hero-content grid gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12 lg:px-12 lg:py-12">
          <div className="hero-fade hero-delay-1">
            <p className="text-xs font-black uppercase tracking-[0.38em] text-cyan-300">GigGuard AI</p>
            <h1 className="mt-4 text-4xl leading-tight font-black sm:text-5xl">
              Protect Daily Earnings
              <span className="block text-cyan-300">Before Disruptions Hit</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Parametric protection for delivery workers with AI-based trigger checks, automatic payout simulation, and real-time risk visibility.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-cyan-300/20 bg-white/5 p-3">
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-200">Auto Claims</p>
                <p className="mt-1 text-sm font-semibold">No manual filing</p>
              </div>
              <div className="rounded-2xl border border-cyan-300/20 bg-white/5 p-3">
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-200">Risk Engine</p>
                <p className="mt-1 text-sm font-semibold">Dynamic premium logic</p>
              </div>
              <div className="rounded-2xl border border-cyan-300/20 bg-white/5 p-3">
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-200">UPI Payout</p>
                <p className="mt-1 text-sm font-semibold">Instant simulation flow</p>
              </div>
            </div>
          </div>

          <div className="hero-fade hero-delay-2 rounded-3xl border border-white/15 bg-white/5 p-5 sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300">Get Started</p>
            <h2 className="mt-3 text-2xl font-black">Choose Your Flow</h2>
            <p className="mt-2 text-sm text-slate-300">
              Start from registration, then move to dashboard triggers and simulated payouts.
            </p>

            <div className="hero-fade hero-delay-3 mt-6 grid gap-3">
              <Link
                href="/register"
                className="cta-shimmer rounded-3xl bg-linear-to-r from-cyan-400 to-sky-500 px-5 py-4 text-center text-sm font-black text-slate-950 transition hover:brightness-110"
              >
                Continue to Register
              </Link>
              <Link
                href="/dashboard"
                className="rounded-3xl border border-white/25 bg-white/5 px-5 py-4 text-center text-sm font-black text-white transition hover:bg-white/10"
              >
                Open Dashboard
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-400">Dashboard access still requires valid registration in the current session.</p>
          </div>
        </div>
      </section>
    </main>
  );
}