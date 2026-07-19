import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutProvider } from "@/lib/layout-context";
import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StadiumBrain AI - FIFA World Cup 2026™",
  description: "An AI-powered stadium intelligence platform for the FIFA World Cup 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-white`}
      >
        <LayoutProvider>
          <div className="flex h-screen w-screen overflow-hidden">
            {/* Sidebar Shell */}
            <Sidebar />

            {/* Content Area Shell */}
            <div className="flex flex-1 flex-col overflow-hidden">
              <Navbar />
              <div className="flex-1 overflow-y-auto bg-zinc-950 select-none">
                {children}
              </div>
            </div>
          </div>
        </LayoutProvider>
      </body>
    </html>
  );
}
