"use client"

import { useEffect, useRef, useState } from "react"

/* ================= DATA ================= */

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

/* Realistic CPA Offer Names */
const offerNames = [
  "Crypto Wallet Signup",
  "Spin & Win Casino App",
  "Cash Rewards Survey",
  "Mobile Legends Level 10",
  "VPN App Free Trial",
  "Finance App Registration",
  "Shopping Cashback App",
  "Online Quiz Rewards",
  "Play & Earn Game Offer",
  "Daily Polls Survey",
  "Streaming App Trial",
  "Gift Card Rewards App",
]

const randomCountry = () =>
  countries[Math.floor(Math.random() * countries.length)]

const randomOfferName = () =>
  offerNames[Math.floor(Math.random() * offerNames.length)]

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

interface LiveOffer {
  id: number
  offerName: string
  flag: string
  amount: string
  time: string
  speed: number
  gradientOffset: number
}

/* ================= HELPERS ================= */

const ROW_HEIGHT = 48
const FPS = 60

const createOffer = (id: number): LiveOffer => {
  const c = randomCountry()
  const scrollTime = 1 + Math.random() * 11

  return {
    id,
    offerName: randomOfferName(),
    flag: c.flag,
    amount: randomAmount(),
    time: randomTime(),
    speed: ROW_HEIGHT / (scrollTime * FPS),
    gradientOffset: Math.random() * 360,
  }
}

/* ================= COMPONENT ================= */

export default function LiveOfferCompletion() {
  const [items, setItems] = useState<LiveOffer[]>(
    Array.from({ length: 100 }, (_, i) => createOffer(i))
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
            if (moved) next.unshift(createOffer(moved.id))
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
        ✅ Live Offer Completion
      </h3>

      <div className="overflow-hidden h-[360px] md:h-[400px] rounded-xl px-2 py-2">
        <div className="grid grid-cols-4 text-center mb-2 text-white font-semibold">
          <span className="hidden md:block">Offer</span>
          <span className="hidden md:block">Country</span>
          <span className="hidden md:block">Amount</span>
          <span className="hidden md:block">Time</span>
        </div>

        <ul ref={listRef} className="space-y-2">
          {items.map((o) => (
            <li
              key={o.id}
              className="grid grid-cols-4 items-center border rounded-xl p-3 text-sm md:text-base text-white"
            >
              <span className="font-semibold truncate">
                {o.offerName}
              </span>

              <span className="text-center text-lg">
                {o.flag}
              </span>

              <span className="text-green-300 font-semibold text-center">
                {o.amount}
              </span>

              <span className="opacity-80 text-center">
                {o.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
