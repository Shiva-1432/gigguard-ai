import type { Metadata } from "next";
import { TopNav } from "./components/top-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "GigGuard AI – Income Protection for Delivery Workers",
  description: "AI-Powered Parametric Insurance for Food Delivery Workers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950">
        <TopNav />
        {children}
      </body>
    </html>
  );
}
