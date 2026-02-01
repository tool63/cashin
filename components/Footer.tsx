"use client"

import { motion } from "framer-motion"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#070A14] border-t border-white/10 text-gray-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-white">PayUp</h2>
          <p className="mt-4 text-sm text-gray-400">
            A trusted rewards platform where millions earn real money daily.
          </p>
        </div>

        {[
          ["Product", ["Earn", "Cashout", "Leaderboard"]],
          ["Company", ["About", "Affiliates", "Careers"]],
          ["Legal", ["Terms", "Privacy", "Cookies"]],
        ].map(([title, links]) => (
          <div key={title}>
            <h3 className="font-semibold text-white mb-4">{title}</h3>
            <ul className="space-y-2 text-sm">
              {links.map((l) => (
                <li
                  key={l}
                  className="hover:text-white transition cursor-pointer"
                >
                  {l}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
        © 2026 PayUp. All rights reserved.
      </div>
    </motion.footer>
  )
}
