"use client";

import { Karla, Petrona } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PlausibleProvider from "next-plausible";
import { AuthProvider } from "@/context/AuthContext";

const textFont = Karla({
  subsets: ["latin"],
});

// Merienda
const headingFont = Petrona({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${textFont.className} ${headingFont.variable} antialiased bg-surface min-h-screen`}
      >
        <PlausibleProvider
          domain="socialfolio.me"
          selfHosted
          trackOutboundLinks
          hash
        >
          <ThemeProvider>
            <SpeedInsights />
            <Toaster />
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <div className="overflow-x-hidden break-words">{children}</div>
              </AuthProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ThemeProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}
