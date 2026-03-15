// app/[country]/page.tsx
import { ReactNode } from "react";

export default function CountryHomePage() {
  return (
    <main className="max-w-container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Welcome to Cashog!</h1>
      <p className="text-lg text-muted mb-8">
        Earn rewards by completing surveys, playing games, watching videos, and more.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-white dark:bg-bg-primary shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="font-semibold text-xl mb-2">Surveys</h2>
          <p className="text-muted">Complete surveys and earn points quickly.</p>
        </div>
        <div className="card bg-white dark:bg-bg-primary shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="font-semibold text-xl mb-2">App Installs</h2>
          <p className="text-muted">Install apps and earn rewards instantly.</p>
        </div>
        <div className="card bg-white dark:bg-bg-primary shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="font-semibold text-xl mb-2">Play Games</h2>
          <p className="text-muted">Play games and collect points while having fun.</p>
        </div>
      </div>
    </main>
  );
}
