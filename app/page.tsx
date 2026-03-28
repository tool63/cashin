import PrimaryCTA from "@/components/cta/PrimaryCTA";

export default function GlobalHomePage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Earn Money Online 🌍
      </h1>

      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        Start earning from anywhere in the world. Choose your country for the best offers.
      </p>

      <PrimaryCTA
        href="/bd"
        translationKey="get_started_now"
        aria-label="Get started"
      />
    </section>
  );
}
