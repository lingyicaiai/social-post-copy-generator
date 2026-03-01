import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Social Post Copy Generator - Multi-Platform Content in Seconds",
  description: "Generate optimized titles, summaries, and hashtags for X, Dev.to, and Hashnode from a single product description. Free AI-powered tool for creators.",
  keywords: "social media copy, hashtag generator, content marketing, X twitter, dev.to, hashnode, AI copywriting",
  openGraph: {
    title: "Social Post Copy Generator",
    description: "Generate platform-optimized social media copy in seconds",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MY02SEZ8R1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MY02SEZ8R1');
          `}
        </Script>
      </head>
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
