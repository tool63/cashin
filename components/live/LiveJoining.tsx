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
  "Amelia",
  "Benjamin",
  "Henry",
  "Ella",
  "Jack",
  "Leo",
  "Grace",
  "Arjun",
  "Ayaan",
  "Rahul",
  "Sofia",
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

const randomCountry = () =>
  countries[Math.floor(Math.random() * countries.length)]

const randomTime = () =>
  `${Math.floor(Math.random() * 10) + 1}s ago`

/* ================= TYPES ================= */

interface LiveJoin {
  id: number
  name: string
  flag: string
  time: string
  speed: number
  gradientOffset: number
}

/* ================= HELPERS ================= */

const ROW_HEIGHT = 48
const FPS = 60

const createJoin = (
  id: number,
  usedNames: Set<string>
): LiveJoin => {
  let name = ""

  // Ensure unique name
  do {
    name = names[Math.floor(Math.random() * names.length)]
  } while (usedNames.has(name))

  usedNames.add(name)

  const scrollTime = 1 + Math.random() * 11
  const c = randomCountry()

  return {
    id,
    name,
    flag: c.flag,
    time: randomTime(),
    speed: ROW_HEIGHT / (scrollTime * FPS),
    gradientOffset: Math.random() * 360,
  }
}

/* ================= COMPONENT ================= */

export default function LiveJoining() {
  const [items, setItems] = useState<LiveJoin[]>([])
  const listRef = useRef<HTMLUListElement>(null)

  // Initial population (unique names)
  useEffect(() => {
    const used = new Set<string>()
    const initial = Array.from({ length: 40 }, (_, i) =>
      createJoin(i, used)
    )
    setItems(initial)
  }, [])

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
            const usedNames = new Set(prev.map((i) => i.name))
            const next = [...prev]
            next.pop()
            next.unshift(createJoin(Date.now(), usedNames))
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
        🔥 Live Joining
      </h3>

      <div className="overflow-hidden h-[360px] md:h-[400px] rounded-xl px-2 py-2">
        {/* Header */}
        <div className="grid grid-cols-3 text-center mb-2 text-white font-semibold">
          <span className="hidden md:block">Name</span>
          <span className="hidden md:block">Country</span>
          <span className="hidden md:block">Time</span>
        </div>

        <ul ref={listRef} className="space-y-2">
          {items.map((j) => (
            <li
              key={j.id}
              className="grid grid-cols-3 items-center border rounded-xl p-3 text-sm md:text-base text-white"
            >
              <span className="font-semibold truncate">
                {j.name}
              </span>

              <span className="text-center text-lg">
                {j.flag}
              </span>

              <span className="opacity-80 text-center">
                {j.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
