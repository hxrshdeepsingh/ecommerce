import type { ReactNode } from "react";

import { LivePreviewListener } from "@/components/LivePreviewListener";
import { Providers } from "@/providers";
import { InitTheme } from "@/providers/Theme/InitTheme";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      className={[GeistSans.variable, GeistMono.variable]
        .filter(Boolean)
        .join(" ")}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <LivePreviewListener />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
