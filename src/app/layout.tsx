import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // 👈 Footer component import
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APEXBUILD | Engineering & Construction Consultancy",
  description:
    "Delivering trusted engineering consultancy, feasibility studies, construction supervision, and contract management services worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-brand-yellow selection:text-slate-950">
        <Navbar />

        <main className="flex-grow pt-20">
          {children}
        </main>

        {/* Footer har page ke bottom par automatically render hoga */}
        <Footer />
      </body>
    </html>
  );
}