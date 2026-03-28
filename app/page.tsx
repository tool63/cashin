import PrimaryCTA from "@/components/cta/PrimaryCTA";
import SeoRenderer from "@/components/SEO/SeoRenderer";
import { generateJsonLd } from "@/components/SEO/schema";
import Link from "next/link";
import { Metadata } from "next";

// Metadata for global homepage
export const metadata: Metadata = {
  title: "Earn Money Online | Cashog",
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

export default function GlobalHomePage() {
  const title = "Earn Money Online Worldwide | Cashog";
  const description =
    "Earn real money online from anywhere in the world. Complete surveys, install apps, play games, and get paid instantly. Join thousands of satisfied users worldwide.";

  const structuredData = generateJsonLd({
    path: "/",
    title,
    description,
    type: "low",
  });

  const countries = [
    { code: "us", name: "United States", flag: "🇺🇸", earnings: "$500+", users: "10,000+" },
    { code: "uk", name: "United Kingdom", flag: "🇬🇧", earnings: "£400+", users: "8,000+" },
    { code: "bd", name: "Bangladesh", flag: "🇧🇩", earnings: "৳15,000+", users: "25,000+" },
    { code: "pk", name: "Pakistan", flag: "🇵🇰", earnings: "₨25,000+", users: "15,000+" },
    { code: "au", name: "Australia", flag: "🇦🇺", earnings: "$600+", users: "5,000+" },
    { code: "ca", name: "Canada", flag: "🇨🇦", earnings: "$550+", users: "7,000+" },
    { code: "in", name: "India", flag: "🇮🇳", earnings: "₹25,000+", users: "50,000+" },
  ];

  return (
    <>
      {/* SEO */}
      <SeoRenderer
        path="/"
        title={title}
        description={description}
        noindex={false}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Earn Money Online 🌍
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Start earning real cash from anywhere in the world. Choose your country and begin your earning journey today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <PrimaryCTA
              href="/us"
              translationKey="get_started_now"
              aria-label="Get started"
            />
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ✓ Trusted by 100,000+ users worldwide • No credit card required • Instant payouts
          </p>
        </div>

        {/* Country Selection Grid */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Select Your Country
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {countries.map((country) => (
              <Link
                key={country.code}
                href={`/${country.code}`}
                className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 text-center border border-gray-100 dark:border-gray-700"
              >
                <div className="text-5xl mb-3">{country.flag}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {country.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Avg. Earnings: {country.earnings}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {country.users} users
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Cashog?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Real Earnings</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get paid via PayPal, bank transfer, and local payment methods
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Instant Payouts</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Withdraw your earnings within 24 hours, no minimum limits
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600 dark:text-gray-400">
                100% legitimate earning opportunities with verified partners
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Sign Up Free</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Create your account in less than 2 minutes - completely free
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Complete Tasks</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Take surveys, install apps, play games, and complete offers
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Paid</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Withdraw your earnings instantly to your preferred payment method
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="text-yellow-400 mb-2">★★★★★</div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "Cashog has changed my life! I earn extra money every month just by completing surveys in my free time."
              </p>
              <p className="font-semibold">- Sarah from UK</p>
              <p className="text-sm text-gray-500">Earned: £450+</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="text-yellow-400 mb-2">★★★★★</div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "Best earning platform I've used. Payouts are instant and customer support is amazing!"
              </p>
              <p className="font-semibold">- Ahmed from BD</p>
              <p className="text-sm text-gray-500">Earned: ৳25,000+</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="text-yellow-400 mb-2">★★★★★</div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "Legit platform! I've recommended Cashog to all my friends. Easy to use and reliable payments."
              </p>
              <p className="font-semibold">- Mike from US</p>
              <p className="text-sm text-gray-500">Earned: $1,200+</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users worldwide and start earning real money today!
            </p>
            <PrimaryCTA
              href="/us"
              translationKey="get_started_now"
              aria-label="Get started now"
            />
            <p className="text-sm mt-6 opacity-70">
              Free to join • No credit card required • Instant payouts
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
