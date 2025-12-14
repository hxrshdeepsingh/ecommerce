import "./globals.css";
import type { ReactNode } from "react";
import NextTopLoader from 'nextjs-toploader';

import { Providers } from "@/providers";
import { InitTheme } from "@/providers/Theme/InitTheme";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'A custom e-commerce store built with Payload CMS and Next.js.',
  title: 'Parth Infotechs',
  icons: {
    icon: '/icon.png',
  }
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
      </head>
      <body>
        <NextTopLoader
          color="#1e9cf0"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="none"
        />
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
