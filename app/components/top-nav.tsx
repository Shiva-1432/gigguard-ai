"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearRegistration } from "../lib/gigguard";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/register", label: "Register" },
  { href: "/dashboard", label: "Dashboard" },
];

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleResetSession = () => {
    clearRegistration();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-2xl border border-white/15 bg-slate-950/70 px-3 py-2 text-sm text-white backdrop-blur">
        <p className="px-2 text-xs font-black uppercase tracking-[0.26em] text-cyan-300">GigGuard</p>
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-1.5 font-semibold transition ${active ? "bg-cyan-300 text-slate-900" : "text-slate-200 hover:bg-white/10 hover:text-white"}`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleResetSession}
            className="rounded-xl border border-rose-200/30 px-3 py-1.5 font-semibold text-rose-200 transition hover:bg-rose-300/15 hover:text-rose-100"
          >
            Reset
          </button>
        </div>
      </nav>
    </header>
  );
}