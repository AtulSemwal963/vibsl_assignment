import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientShell from "./components/layout/ClientShell";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibsl — Build faster with a beautiful starter",
  description: "A modern Next.js starter with responsive landing-page sections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col font-sans text-zinc-50"
        style={{ backgroundColor: "#252526" }}
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}