import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster"; // ✅ Import the Toaster

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crown Enterprises",
  description:
    "Shop top-quality human hair extensions, wigs, and more. 100% Virgin Hair.",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className} min-h-screen bg-background text-foreground`}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
