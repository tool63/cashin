"use client";
import { ReactNode, useState, useEffect, useRef } from "react";

/* ================= LIVE WRAPPER ================= */
export function LiveWrapper({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-gray-50 dark:bg-[#111827] rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

/* ================= SECTION TITLE ================= */
export function SectionTitle({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
        <span>{icon}</span>
        <span>{text}</span>
      </h2>
      <div className="mt-2 w-24 h-1 bg-cyan-400 mx-auto rounded-full" />
    </div>
  );
}

/* ================= STAT ================= */
export function Stat({ title, value }: { title: string; value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [animate, setAnimate] = useState(false);

  // Extract numeric value and suffix
  const numericValue = parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;
  const suffix = String(value).replace(/[0-9.]/g, "");
  const decimals = numericValue % 1 !== 0 ? 1 : 0; // show 1 decimal if needed

  // Trigger animation when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Animate counter
  useEffect(() => {
    if (!animate) return;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const valueToSet = parseFloat((progress * numericValue).toFixed(decimals));
      setCount(valueToSet);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [animate, numericValue, decimals]);

  return (
    <div
      ref={ref}
      className="bg-white dark:bg-[#111827] p-6 rounded-xl shadow-md flex flex-col items-center"
    >
      <span className="text-2xl font-bold">{count}{suffix}</span>
      <span className="text-gray-600 dark:text-gray-400 mt-1">{title}</span>
    </div>
  );
}

/* ================= FEATURE ================= */
export function Feature({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="bg-white dark:bg-[#111827] p-6 rounded-xl shadow-md flex flex-col items-center text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}
