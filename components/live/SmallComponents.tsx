import React from "react"

/* ================= LIVE WRAPPER ================= */
export const LiveWrapper: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-gray-100 dark:bg-white/5 rounded-2xl shadow-md mb-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

/* ================= SECTION TITLE ================= */
export const SectionTitle: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold">
      {icon} {text}
    </h2>
  </div>
)

/* ================= STAT CARD ================= */
export const Stat: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="text-center p-4 bg-white dark:bg-[#111827] rounded-xl shadow">
    <h4 className="text-lg font-semibold">{title}</h4>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
)

/* ================= FEATURE CARD ================= */
export const Feature: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div className="p-6 bg-white dark:bg-[#111827] rounded-xl shadow flex flex-col items-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h4 className="font-semibold">{title}</h4>
  </div>
)
