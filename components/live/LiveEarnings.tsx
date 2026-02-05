"use client"

import { useEffect, useRef, useState } from "react"

/* ================= DATA ================= */

const names = [
  "Alex",
  "James",
  "Emma",
  "Olivia",
  "Daniel",
  "Sophia",
  "Liam",
  "Noah",
  "Ava",
  "Lucas",
  "Mia",
  "Ethan",
  "Amelia",
  "Benjamin",
]

const countries = [
  { flag: "🇺🇸" },
  { flag: "🇬🇧" },
  { flag: "🇨🇦" },
  { flag: "🇩🇪" },
  { flag: "🇮🇳" },
  { flag: "🇫🇷" },
  { flag: "🇯🇵" },
  { flag: "🇧🇷" },
]

const randomName = () =>
  names[Math.floor(Math.random() * names.length)]

const randomCountry = () =>
  countries[Math.floor(Math.random() * countries.length)]

/* ================= AMOUNT LOGIC ================= */
/**
 * 80%: $0.05 – $0.99
 * 20%: $1.00 – $2.00
 */
const randomAmount = () => {
  const low = Math.random() < 0.8
  const value = low
    ? Math.random() * 0.94 + 0.05
    : Math.random() * 1 + 1

  return `$${value.toFixed(2)}`
}

const randomTime = () =>
  `${Math.floor(Math.random() * 10) + 1}s ago`

/* ================= TYPES ================= */

interface LiveEarning {
  id: number
  name: string
  flag: string
  amount: string
  time: string
  speed: number
  gradientOffset: number
}

/* ================= HELPERS ================= */

const ROW_HEIGHT = 48
const FPS = 60

const createEarning = (id: number): LiveEarning => {
  const c = randomCountry()
  const scrollTime = 1 + Math.random() * 11

  return {
    id,
    name: randomName(),
    flag: c.flag,
    amount: randomAmount(),
    time: randomTime(),
    speed: ROW_HEIGHT / (scrollTime * FPS),
    gradientOffset: Math.random() * 360,
  }
}

/* ================= COMPONENT ================= */

export default function LiveEarnings() {
  const [items, setItems] = useState<LiveEarning[]>(
    Array.from({ length: 100 }, (_, i) => createEarning(i))
  )

  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    let raf: number

    const animate = () => {
      if (!listRef.current) return

      const rows = Array.from(
        listRef.current.children
      ) as HTMLLIElement[]

      rows.forEach((row, index) => {
        const item = items[index]
        if (!item) return

        let mb = parseFloat(row.style.marginBottom || "0")
        mb += item.speed
        row.style.marginBottom = `${mb}px`

        item.gradientOffset += 0.6
        row.style.background = `
          linear-gradient(
            90deg,
            hsl(${item.gradientOffset},100%,50%),
            hsl(${(item.gradientOffset + 120) % 360},100%,50%),
            hsl(${(item.gradientOffset + 240) % 360},100%,50%)
          )
        `
      })

      const last = rows[rows.length - 1]
      if (last) {
        const height = last.offsetHeight
        const mb = parseFloat(last.style.marginBottom || "0")

        if (mb >= height) {
          rows.forEach((r) => (r.style.marginBottom = "0"))

          setItems((prev) => {
            const next = [...prev]
            const moved = next.pop()
            if (moved) next.unshift(createEarning(moved.id))
            return next
          })
        }
      }

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [items])

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-white">
        💸 Live Earnings
      </h3>

      <div className="overflow-hidden h-[360px] md:h-[400px] rounded-xl px-2 py-2">
        {/* Header */}
        <div className="grid grid-cols-4 text-center mb-2 text-white font-semibold">
          <span className="hidden md:block">Name</span>
          <span className="hidden md:block">Country</span>
          <span className="hidden md:block">Amount</span>
          <span className="hidden md:block">Time</span>
        </div>

        <ul ref={listRef} className="space-y-2">
          {items.map((e) => (
            <li
              key={e.id}
              className="grid grid-cols-4 items-center border rounded-xl p-3 text-sm md:text-base text-white"
            >
              <span className="font-semibold truncate">
                {e.name}
              </span>

              <span className="text-center text-lg">
                {e.flag}
              </span>

              <span className="text-green-300 font-semibold text-center">
                {e.amount}
              </span>

              <span className="opacity-80 text-center">
                {e.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
