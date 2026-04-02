"use client";

import { motion } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  title?: string; // ✅ added
  faqs: FAQItem[];
}

/* Animation Variants */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function FAQ({ title, faqs }: FAQProps) {
  return (
    <div className="mb-20">
      {/* ✅ TITLE SECTION */}
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 bg-clip-text text-transparent">
            {title}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto mt-4 rounded-full" />
        </motion.div>
      )}

      {/* ✅ FAQ LIST (UNCHANGED ANIMATION) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-4"
      >
        {faqs.map((faq, i) => (
          <motion.details
            key={i}
            variants={itemVariants}
            className="group bg-white dark:bg-[#0b0e1a] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <summary className="font-semibold text-lg px-6 py-4 cursor-pointer flex items-center justify-between hover:bg-gradient-to-r hover:from-yellow-400/5 hover:via-green-400/5 hover:to-green-500/5">
              <span>{faq.q}</span>
              <span className="text-green-500 group-open:rotate-180 transition-transform duration-300">
                ▼
              </span>
            </summary>

            <div className="px-6 pb-4 pt-4 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
              {faq.a}
            </div>
          </motion.details>
        ))}
      </motion.div>
    </div>
  );
}
