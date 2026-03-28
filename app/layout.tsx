import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Cashog",
    default: "Earn Money Online",
  },
  description: "Earn real money online from anywhere in the world. Complete surveys, install apps, play games, and get paid instantly. Join thousands of satisfied users worldwide.",
  keywords: [
    "earn money online",
    "make money online",
    "online earning",
    "paid surveys",
    "get paid",
    "cash app",
    "online jobs",
    "work from home",
    "earn cash",
    "money making apps",
    "Cashog",
    "earn money fast",
    "legitimate online income",
    "side hustle",
    "passive income",
    "online rewards",
    "get paid to play games",
    "get paid to take surveys",
    "instant payout",
    "real earning app",
  ].join(", "),
  authors: [{ name: "Cashog" }],
  creator: "Cashog",
  publisher: "Cashog",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://cashog.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cashog.com",
    siteName: "Cashog",
    title: "Earn Money Online | Cashog",
    description: "Earn real money online from anywhere in the world. Complete surveys, install apps, play games, and get paid instantly.",
    images: [
      {
        url: "https://cashog.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Earn Money Online - Cashog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Earn Money Online | Cashog",
    description: "Earn real money online from anywhere in the world.",
    images: ["https://cashog.com/twitter-image.jpg"],
    creator: "@cashog",
    site: "@cashog",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
