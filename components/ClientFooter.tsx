"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import React from "react"

export default function ClientFooter() {
  return (
    <motion.footer
      className="bg-gray-50 text-gray-800 py-6 mt-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <motion.p
          className="text-sm"
          whileHover={{ scale: 1.05, color: "#3b82f6" }} // Tailwind blue-500
        >
          &copy; 2026 PayUp. All rights reserved.
        </motion.p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.1, color: "#3b82f6" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href="#">{item}</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}
