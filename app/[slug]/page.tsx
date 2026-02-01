"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlankPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">
          Feature Coming Soon
        </h1>

        <p className="text-gray-600 mb-8">
          This section is currently under development.
          You can already start earning on Cashooz while we build this feature.
        </p>

        <Link
          href="/start-earning"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Start earning in 60 seconds
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </main>
  );
}
