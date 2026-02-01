// app/page.tsx
export default function Home() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <section className="pt-20 pb-12 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Get Paid for Games, Surveys & More
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Join millions earning real rewards today — fast cashouts, top offers,
            and more.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Start Earning
            </button>
            <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition">
              How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 border rounded-lg">
            <h2 className="text-3xl font-bold">261K+</h2>
            <p>Verified Reviews</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h2 className="text-3xl font-bold">$50M+</h2>
            <p>Total Payouts</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h2 className="text-3xl font-bold">17M+</h2>
            <p>Active Users</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-8">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Choose an Offer" },
              { step: "2", title: "Complete It" },
              { step: "3", title: "Get Paid" },
            ].map(({ step, title }) => (
              <div key={step} className="p-6 border rounded-lg hover:shadow-lg transition">
                <div className="text-indigo-600 text-4xl font-bold">{step}</div>
                <h4 className="mt-3 text-xl font-semibold">{title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
