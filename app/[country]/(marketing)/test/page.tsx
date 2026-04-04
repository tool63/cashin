import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Page",
  description: "This is a test page",
};

export default function TestPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Test Page Works!</h1>
        <p className="mt-4">If you see this, the routing is working.</p>
      </div>
    </main>
  );
}
