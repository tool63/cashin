"use client";

import { Stat } from "@/components/live/SmallComponents";

export default function TrustSection() {
  return (
    <section className="py-20 bg-gray-100 dark:bg-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Trusted by Millions Worldwide
        </h2>

        {/* Subtext */}
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-14">
          Cashog is one of the most trusted earning platforms, paying users daily
          across the globe with fast, secure, and verified withdrawals.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          <Stat title="Total Users" value="25M+" />
          <Stat title="Users Paid" value="3.2M+" />
          <Stat title="Total Payouts" value="$12M+" />
          <Stat title="Trust Rating" value="4.8 ★" />
        </div>
      </div>
    </section>
  );
}
