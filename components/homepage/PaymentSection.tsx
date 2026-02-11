"use client";

export default function PaymentSection() {
  const methods = [
    { name: "PayPal", emoji: "💸" },
    { name: "USDT", emoji: "🪙" },
    { name: "Bitcoin", emoji: "₿" },
    { name: "Gift Cards", emoji: "🎁" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-4">Payment Methods</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-14 max-w-2xl mx-auto">
          Fast, secure, and trusted payout options.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-8 justify-center">
          {methods.map((method) => (
            <div
              key={method.name}
              className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 px-6 py-8 flex flex-col items-center hover:scale-105 transition-transform"
            >
              <span className="text-4xl mb-3">{method.emoji}</span>
              <span className="text-lg font-semibold">{method.name}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Instant payout
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
