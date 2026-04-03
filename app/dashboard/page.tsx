"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  hasActiveRegistrationSession,
  isRegistrationComplete,
  loadRegistration,
  PLANS,
  type RegistrationData,
  type TriggerResponse,
  type TriggerType,
} from "../lib/gigguard";

type PremiumState = {
  riskLevel: "HIGH" | "LOW";
  premium: number;
  rainfall: number;
  aqi: number;
  temperature: number;
};

const TRIGGER_RULES: Record<TriggerType, string> = {
  rain: "Rainfall > 50 mm/hr",
  aqi: "AQI > 350",
  heat: "Temperature > 45°C",
};

const TRIGGER_BUTTONS: Array<{ type: TriggerType; label: string; icon: string; border: string }> = [
  { type: "rain", label: "Simulate Rain", icon: "🌧", border: "border-cyan-300/40" },
  { type: "aqi", label: "Simulate AQI", icon: "🌫", border: "border-slate-300/30" },
  { type: "heat", label: "Simulate Heat", icon: "☀️", border: "border-amber-300/40" },
];

const getTriggeredPremium = (triggerType: TriggerType): PremiumState => {
  if (triggerType === "rain") {
    return { riskLevel: "HIGH" as const, premium: 50, rainfall: 60, aqi: 180, temperature: 28 };
  }

  if (triggerType === "aqi") {
    return { riskLevel: "HIGH" as const, premium: 52, rainfall: 15, aqi: 385, temperature: 32 };
  }

  // heat trigger
  return { riskLevel: "HIGH" as const, premium: 55, rainfall: 5, aqi: 250, temperature: 46 };
};

export default function DashboardPage() {
  const router = useRouter();
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const hasSession = useSyncExternalStore(
    () => () => {},
    () => hasActiveRegistrationSession(),
    () => false
  );
  const workerSnapshot = useSyncExternalStore(
    () => () => {},
    () => {
      const registration = loadRegistration();
      return isRegistrationComplete(registration) ? JSON.stringify(registration) : "";
    },
    () => ""
  );
  const worker = useMemo<RegistrationData | null>(() => {
    if (!workerSnapshot) {
      return null;
    }

    return JSON.parse(workerSnapshot) as RegistrationData;
  }, [workerSnapshot]);

  // FIX #1: Initialize premium based on actual plan
  const [premium, setPremium] = useState<PremiumState>(() => {
    if (!worker) {
      return { riskLevel: "LOW", premium: 0, rainfall: 0, aqi: 0, temperature: 0 };
    }
    return {
      riskLevel: "LOW",
      premium: PLANS[worker.plan].premium,
      rainfall: 0,
      aqi: 150,
      temperature: 28,
    };
  });
  const [status, setStatus] = useState<TriggerResponse | null>(null);
  const [creditedAt, setCreditedAt] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [activeTrigger, setActiveTrigger] = useState<TriggerType | null>(null);
  const [triggerLabel, setTriggerLabel] = useState(TRIGGER_RULES.rain);
  const modalRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!toastVisible) {
      return;
    }

    previousFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setToastVisible(false);
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) {
        return;
      }

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        // FIX #10: Fallback to modal itself if no focusable elements
        modalRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
        return;
      }

      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      previousFocusedRef.current?.focus();
    };
  }, [toastVisible]);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    if (!hasSession || !worker) {
      router.replace("/");
    }
  }, [isClient, hasSession, worker, router]);

  const closePopup = () => {
    setToastVisible(false);
  };

  const runTrigger = async (triggerType: TriggerType) => {
    setRunning(true);
    setActiveTrigger(triggerType);
    setVerified(false);
    setStatus(null);
    setError(null);

    setTriggerLabel(TRIGGER_RULES[triggerType]);

    try {
      // FIX #5 & #6: Validate response and handle errors properly
      const response = await fetch("/api/check-trigger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rainfall: triggerType === "rain" ? 60 : 15,
          triggerType,
          plan: worker?.plan || "Standard",
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = (await response.json()) as TriggerResponse;

      if (!data || typeof data.payout !== "number") {
        throw new Error("Invalid API response format");
      }

      if (data.trigger) {
        const creditedTime = new Date().toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "2-digit",
        });

        setStatus(data);
        // FIX #3 & #4: getTriggeredPremium now returns all sensor values
        setPremium(getTriggeredPremium(triggerType));
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setVerified(true);
        setCreditedAt(creditedTime);
        setToastVisible(true);
        
        // FIX #7: Reset trigger with timeout to prevent jank
        window.setTimeout(() => {
          setToastVisible(false);
          setActiveTrigger(null);
        }, 2600);
      }
    } catch (err) {
      // FIX #6: Proper error handling
      const errorMsg = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMsg);
      console.error("Trigger error:", errorMsg);
    } finally {
      // FIX #7: Reset running state regardless of outcome
      setRunning(false);
      // Only reset activeTrigger if not already scheduled
      if (!toastVisible) {
        setActiveTrigger(null);
      }
    }
  };

  if (!isClient || !worker || !hasSession) {
    return null;
  }

  const activePlan = worker.plan;
  const plan = PLANS[activePlan];
  // FIX #2: Improved displayedPremium logic with plan baseline
  const displayedPremium = premium.premium > plan.premium ? premium.premium : plan.premium;
  const topMessage = running
    ? "Processing trigger and verification..."
    : verified && status
      ? `✅ Process completed. ₹${status.payout} sent to UPI.`
      : error
        ? `❌ Error: ${error}`
        : null;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_18%_18%,#0f3057_0%,#020617_40%,#020617_100%)] px-4 py-8 text-white sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:gap-5">
        <section className="rounded-4xl bg-linear-to-br from-sky-500 via-cyan-500 to-emerald-400 p-6 text-slate-950 shadow-[0_24px_70px_rgba(34,211,238,0.25)] sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-800/80">GigGuard AI</p>
              <h1 className="mt-2 text-3xl leading-tight font-black sm:text-4xl">Dashboard</h1>
              <div className="mt-3 grid gap-1 text-sm font-semibold sm:grid-cols-3 sm:gap-5">
                <p>Worker: <span className="font-black">{worker.name}</span></p>
                <p>Active Plan: <span className="font-black">{activePlan}</span></p>
                <p>Coverage: <span className="font-black">₹{plan.coverage}/day</span></p>
              </div>
            </div>
            <p className="inline-flex h-fit rounded-full bg-black/15 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em]">
              Active
            </p>
          </div>
        </section>

        {topMessage && (
          <section className={`rounded-3xl border p-4 text-sm font-semibold ${running ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100" : "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"}`}>
            {topMessage}
          </section>
        )}

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-4">
            <section className="rounded-4xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-base font-bold text-slate-100">Dynamic Premium</p>
                <p className={`rounded-full px-3 py-1 text-xs font-black ${premium.riskLevel === "HIGH" ? "bg-red-300/20 text-red-200" : "bg-emerald-300/20 text-emerald-200"}`}>
                  {premium.riskLevel} RISK
                </p>
              </div>

              <div className="grid gap-2.5 text-sm">
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span className="text-slate-300">Base Premium</span>
                  <span className="font-black">₹{plan.premium}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span className="text-slate-300">Risk Level</span>
                  <span className={`font-black ${premium.riskLevel === "HIGH" ? "text-red-300" : "text-emerald-300"}`}>{premium.riskLevel}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span className="text-slate-300">Updated Premium</span>
                  <span className="font-black text-emerald-300">₹{displayedPremium}</span>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-400">
              {activeTrigger === "rain" && `Live rainfall signal: ${premium.rainfall} mm/hr`}
              {activeTrigger === "aqi" && `Live AQI signal: ${premium.aqi}`}
              {activeTrigger === "heat" && `Live temperature signal: ${premium.temperature}°C`}
              {!activeTrigger && "No active trigger"}
            </p>
            </section>

            {status && (
              <section className="rounded-4xl border border-emerald-400/40 bg-emerald-400/10 p-5 sm:p-6">
                <p className="text-sm font-black text-emerald-200">🚨 {status.reason} Detected</p>
                <p className="mt-2 text-sm text-slate-200">✅ Verified</p>
                <p className="mt-2 text-2xl leading-tight font-black text-white">💰 ₹{status.payout} Sent to UPI</p>
                <div className="mt-3 grid gap-1 text-sm text-slate-300 sm:grid-cols-2">
                  <p>Reason: {status.reason}</p>
                  <p>Time: {creditedAt}</p>
                </div>
              </section>
            )}

          </div>

          <aside className="space-y-4">
            <section className="rounded-4xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-base font-bold text-slate-100">Trigger Rules</p>
              <p className="mt-2 text-sm text-slate-300">Current: {triggerLabel}</p>
              <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-slate-400">
                <p>Rain: {TRIGGER_RULES.rain}</p>
                <p>AQI: {TRIGGER_RULES.aqi}</p>
                <p>Heat: {TRIGGER_RULES.heat}</p>
              </div>
            </section>

            <section className="rounded-4xl border border-white/10 bg-white/5 p-4 sm:p-5">
              <p className="mb-3 text-sm font-bold text-slate-200">Simulate Trigger</p>
              <div className="grid gap-2.5">
                {TRIGGER_BUTTONS.map((item) => {
                  const isActive = activeTrigger === item.type;

                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => runTrigger(item.type)}
                      disabled={running}
                      className={`flex items-center justify-between rounded-3xl border px-4 py-3.5 text-left text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-60 ${item.type === "rain" ? "cta-shimmer border-cyan-200/40 bg-linear-to-r from-cyan-400 to-sky-500 text-slate-950 hover:brightness-110" : `${item.border} bg-white/5 text-white hover:bg-white/10`}`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </span>
                      <span className="text-xs uppercase tracking-wide opacity-80">{isActive ? "Running" : "Ready"}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          </aside>
        </div>
      </div>

      {toastVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4" onClick={closePopup}>
          <section
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="claim-success-title"
            aria-describedby="claim-success-description"
            className="relative w-full max-w-3xl rounded-4xl border border-emerald-400/35 bg-slate-900/95 p-7 text-center shadow-[0_30px_80px_rgba(16,185,129,0.22)] backdrop-blur"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closePopup}
              className="absolute top-4 right-4 rounded-full border border-white/25 px-3 py-1 text-xs font-bold text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              Close
            </button>
            <p className="text-2xl">✅</p>
            <p id="claim-success-title" className="mt-2 text-2xl font-black text-white">Auto claim completed</p>
            <p className="mt-2 text-4xl font-black text-emerald-300">₹{status && status.payout ? status.payout : 0} Credited Successfully!</p>
            <p id="claim-success-description" className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Press Esc to dismiss</p>
          </section>
        </div>
      )}
    </main>
  );
}