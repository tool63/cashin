"use client";

import { motion } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
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

export default function FAQ({ faqs }: FAQProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-4 mb-20"
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

          <div className="px-6 pb-4 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-4">
            {faq.a}
          </div>
        </motion.details>
      ))}
    </motion.div>
  );
}
