"use client"

import { useEffect, useRef, useState } from "react"
import { LiveItem, useLiveEngine } from "./useLiveEngine"

interface LiveProps {
  title: string
  type: "join" | "earn" | "withdraw" | "offer"
}

export default function LiveEngine({ title, type }: LiveProps) {
  const items = useLiveEngine(type)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    let animationFrame: number

    const animate = () => {
      if (!listRef.current) return
      const listItems = Array.from(listRef.current.children) as HTMLLIElement[]

      listItems.forEach((item, idx) => {
        // Slide username back and forth
        const usernameSpan = item.querySelector("span.username") as HTMLSpanElement
        if (usernameSpan) {
          const offset = Math.sin(Date.now() / 300 + idx) * 4
          usernameSpan.style.transform = `translateX(${offset}px)`
        }

        // Flag bounce
        const flagSpan = item.querySelector("span.flag") as HTMLSpanElement
        if (flagSpan) flagSpan.classList.toggle("animate-bounce", Math.random() < 0.02)
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [items])

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-white">{title}</h3>

      <div className="overflow-hidden h-[360px] md:h-[400px] relative rounded-xl px-2 py-2 bg-black/20">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-3 text-center mb-2 text-white font-semibold">
          <span className="hidden md:block">Username</span>
          <span className="hidden md:block">Country</span>
          <span className="hidden md:block">
            {type === "earn"
              ? "Amount"
              : type === "withdraw"
              ? "Method"
              : "Time"}
          </span>
        </div>

        <ul ref={listRef} className="space-y-2 relative z-10">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border rounded-xl p-3 text-sm md:text-base relative bg-black/40"
            >
              <span className="username font-semibold z-10 relative">{item.user}</span>
              <span className="flex items-center justify-center gap-2 z-10 relative">
                <span className="flag">{item.flag}</span>
                <span className="hidden md:inline">{item.country}</span>
              </span>
              <span className="text-gray-200 dark:text-gray-400 z-10 relative">
                {type === "earn"
                  ? item.amount
                  : type === "withdraw"
                  ? item.method
                  : item.time}
              </span>

              <span
                className="absolute inset-0 rounded-xl opacity-40 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2), transparent 70%)`,
                  animation: `ripple ${0.5 + Math.random() * 1.5}s infinite`,
                }}
              ></span>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        @keyframes ripple {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}
