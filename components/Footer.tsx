"use client"

import { motion } from "framer-motion"

type FooterSection = {
  title: string
  links: string[]
}

const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: ["Earn", "Cashout", "Leaderboard"],
  },
  {
    title: "Company",
    links: ["About", "Affiliates", "Careers"],
  },
  {
    title: "Legal",
    links: ["Terms", "Privacy", "Cookies"],
  },
]

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#070A14] border-t border-white/10 text-gray-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white">PayUp</h2>
          <p className="mt-4 text-sm text-gray-400">
            A trusted rewards platform where millions earn real money daily.
          </p>
        </div>

        {/* LINKS */}
        {footerSections.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold text-white mb-4">
              {section.title}
            </h3>

            <ul className="space-y-2 text-sm">
              {section.links.map((link) => (
                <li
                  key={link}
                  className="hover:text-white transition cursor-pointer"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PayUp. All rights reserved.
      </div>
    </motion.footer>
  )
}
