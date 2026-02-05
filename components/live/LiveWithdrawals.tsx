"use client"

import { useEffect, useRef, useState } from "react"

/* ================= DATA ================= */

const names = [
  "Alex",
  "Emma",
  "Liam",
  "Noah",
  "Olivia",
  "Sophia",
  "James",
  "Daniel",
  "Ava",
  "Lucas",
  "Mia",
  "Ethan",
]

const countries = [
  { flag: "🇺🇸" },
  { flag: "🇬🇧" },
  { flag: "🇨🇦" },
  { flag: "🇩🇪" },
  { flag: "🇫🇷" },
  { flag: "🇮🇳" },
  { flag: "🇯🇵" },
  { flag: "🇧🇷" },
]

const withdrawTypes = [
  "PayPal",
  "Bitcoin",
  "Litecoin",
  "Ethereum",
  "Dogecoin",
  "Amazon Gift Card",
  "Google Play Gift Card",
  "Steam Gift Card",
  "Apple Gift Card",
]

const randomName = () =>
  names[Math.floor(Math.random() * names.length)]

const randomCountry = () =>
  countries[Math.floor(Math.random() * countries.length)]

const randomWithdrawType = () =>
  withdrawTypes[Math.floor(Math.random() * withdrawTypes.length)]

/* ================= AMOUNT LOGIC ================= */
/**
 * Range: $2.00 – $20.00
 * Bias toward smaller withdrawals (realistic)
 */
const randomAmount = () => {
  const biased = Math.pow(Math.random(), 1.6) // skew low
  const value = 2 + biased * 18
  return `$${value.toFixed(2)}`
}

const randomTime = () =>
  `${Math.floor(Math.random() * 10) + 1}s ago`

/* ================= TYPES ================= */

interface LiveWithdrawal {
  id: number
  name: string
  flag: string
  method: string
  amount: string
  time: string
  speed: number
  gradientOffset: number
}

/* ================= HELPERS ================= */

const ROW_HEIGHT = 48
const FPS = 60

const createWithdrawal = (id: number): LiveWithdrawal => {
  const scrollTime = 1 + Math.random() * 11
  const c = randomCountry()

  return {
    id,
    name: randomName(),
    flag: c.flag,
    method: randomWithdrawType(),
    amount: randomAmount(),
    time: randomTime(),
    speed: ROW_HEIGHT / (scrollTime * FPS),
    gradientOffset: Math.random() * 360,
  }
}

/* ================= COMPONENT ================= */

export default function LiveWithdrawals() {
  const [items, setItems] = useState<LiveWithdrawal[]>(
    Array.from({ length: 100 }, (_, i) => createWithdrawal(i))
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
            if (moved) next.unshift(createWithdrawal(moved.id))
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
        💵 Live Withdrawals
      </h3>

      <div className="overflow-hidden h-[360px] md:h-[400px] rounded-xl px-2 py-2">
        {/* Header */}
        <div className="grid grid-cols-5 text-center mb-2 text-white font-semibold">
          <span className="hidden md:block">Name</span>
          <span className="hidden md:block">Country</span>
          <span className="hidden md:block">Method</span>
          <span className="hidden md:block">Amount</span>
          <span className="hidden md:block">Time</span>
        </div>

        <ul ref={listRef} className="space-y-2">
          {items.map((w) => (
            <li
              key={w.id}
              className="grid grid-cols-5 items-center border rounded-xl p-3 text-sm md:text-base text-white"
            >
              <span className="font-semibold truncate">
                {w.name}
              </span>

              <span className="text-center text-lg">
                {w.flag}
              </span>

              <span className="text-center truncate">
                {w.method}
              </span>

              <span className="text-green-300 font-semibold text-center">
                {w.amount}
              </span>

              <span className="opacity-80 text-center">
                {w.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
