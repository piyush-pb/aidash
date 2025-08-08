import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

export const metadata: Metadata = {
  title: "ADmyBRAND Insights - Analytics Dashboard",
  description: "Professional analytics dashboard for marketing agencies and their clients",
  keywords: ["analytics", "dashboard", "marketing", "campaigns", "insights"],
  authors: [{ name: "ADmyBRAND" }],
  robots: "index, follow",
  openGraph: {
    title: "ADmyBRAND Insights - Analytics Dashboard",
    description: "Professional analytics dashboard for marketing agencies and their clients",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
