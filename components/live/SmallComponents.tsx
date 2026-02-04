import React from "react";

/* ================= SECTION TITLE ================= */
export const SectionTitle = ({ icon, text }: { icon: string; text: string }) => (
  <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-2">
    {icon} {text}
  </h2>
);

/* ================= STAT COMPONENT ================= */
export const Stat = ({ title, value }: { title: string; value: string }) => (
  <div className="text-center">
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-gray-500 dark:text-gray-400">{title}</p>
  </div>
);

/* ================= FEATURE COMPONENT ================= */
export const Feature = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex flex-col items-center text-center gap-2">
    {icon}
    <h3 className="mt-2 font-semibold">{title}</h3>
  </div>
);
