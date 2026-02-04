"use client"

import { useEffect, useRef, useState } from "react"

/* ================= DATA ================= */

const countries = [
  { name: "USA", flag: "🇺🇸" },
  { name: "UK", flag: "🇬🇧" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "India", flag: "🇮🇳" },
  { name: "France", flag: "🇫🇷" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Brazil", flag: "🇧🇷" },
]

const names = [
  "Alex", "Mia", "John", "Sara", "Leo",
  "Emma", "Chris", "Liam", "Olivia", "Noah",
]

const methods = ["PayPal", "USDT", "Bitcoin", "Gift Card"]

const randomUser = () =>
  names[Math.floor(Math.random() * names.length)] +
  Math.floor(Math.random() * 100)

const randomCountry = () =>
  countries[Math.floor(Math.random() * countries.length)]

const randomMethod = () =>
  methods[Math.floor(Math.random() * methods.length)]

/* ================= TYPES ================= */

interface LiveWithdrawal {
  id: number
  user: string
  country: string
  flag: string
  method: string
  speed: number
  gradientOffset: number
}

/* ================= HELPERS ================= */

const ROW_HEIGHT = 48
const FPS = 60

const createWithdrawal = (id: number): LiveWithdrawal => {
  const c = randomCountry()
  const scrollTime = 1 + Math.random() * 11

  return {
    id,
    user: randomUser(),
    country: c.name,
    flag: c.flag,
    method: randomMethod(),
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

        // vertical scroll illusion
        let mb = parseFloat(row.style.marginBottom || "0")
        mb += item.speed
        row.style.marginBottom = `${mb}px`

        // animated rainbow gradient
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

      // recycle rows
      const last = rows[rows.length - 1]
      if (last) {
        const height = last.offsetHeight
        const mb = parseFloat(last.style.marginBottom || "0")

        if (mb >= height) {
          rows.forEach((r) => (r.style.marginBottom = "0"))

          setItems((prev) => {
            const next = [...prev]
            const moved = next.pop()
            if (moved) {
              next.unshift(createWithdrawal(moved.id))
            }
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
        <div className="grid grid-cols-3 text-center mb-2 text-white font-semibold">
          <span className="hidden md:block">Username</span>
          <span className="hidden md:block">Country</span>
          <span className="hidden md:block">Method</span>
        </div>

        <ul ref={listRef} className="space-y-2">
          {items.map((w) => (
            <li
              key={w.id}
              className="flex justify-between items-center border rounded-xl p-3 text-sm md:text-base text-white"
            >
              <span className="font-semibold">{w.user}</span>

              <span className="flex gap-2 items-center">
                <span>{w.flag}</span>
                <span className="hidden md:inline">{w.country}</span>
              </span>

              <span className="opacity-80">{w.method}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
