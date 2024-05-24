import type { Metadata } from "next";
import { Yomogi } from "next/font/google";
import "./globals.css";

const yomogi = Yomogi({ subsets:["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "pokeDex",
  description: "practice for using next.js/tailwind/FramerMotion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={yomogi.className}>{children}</body>
    </html>
  );
}
