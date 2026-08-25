import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Birthday (27 August 2026)",
  description: "A cinematic and heartfelt tribute for a special birthday on 27 August 2026.",
  metadataBase: new URL("https://example.com"),
  applicationName: "Happy Birthday",
  keywords: ["birthday", "love story", "romantic website", "special message"],
  creator: "OpenAI",
  openGraph: {
    title: "Happy Birthday (27 August 2026)",
    description: "A cinematic and heartfelt tribute for a special birthday on 27 August 2026.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Birthday (27 August 2026)",
    description: "A cinematic and heartfelt tribute for a special birthday on 27 August 2026."
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#fff7fa",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden bg-[#fff7fa] text-[#3d2a34] antialiased [padding-bottom:calc(env(safe-area-inset-bottom)+1rem)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#fff7fa] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#3d2a34]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
