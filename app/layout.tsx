import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://portfolio-one-hazel-32.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Aarav Jhawar | Connective Tissue",
  description:
    "AI engineer building the AI-Based Universal Compression Platform. Knowledge graphs, ML systems, and the connective tissue between data and intelligence.",
  keywords: [
    "Aarav Jhawar",
    "Aarav Jhawar Plaksha",
    "Aarav Jhawar AI Engineer",
    "Plaksha University",
    "AI Engineer",
    "Machine Learning Engineer",
  ],
  authors: [{ name: "Aarav Jhawar", url: SITE_URL }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aarav Jhawar",
    description:
      "AI engineer building the AI-Based Universal Compression Platform.",
    type: "website",
    url: SITE_URL,
    siteName: "Aarav Jhawar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aarav Jhawar",
    description:
      "AI engineer building the AI-Based Universal Compression Platform.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aarav Jhawar",
  url: SITE_URL,
  jobTitle: "AI Engineer Intern",
  description:
    "Computer Science and Artificial Intelligence student at Plaksha University building AI systems, data compression platforms, and knowledge graphs.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Plaksha University",
  },
  sameAs: [
    "https://github.com/Aarav-2006",
    "https://linkedin.com/in/aarav-jhawar-a9a9b5276",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full bg-bg text-ink">{children}</body>
    </html>
  );
}
