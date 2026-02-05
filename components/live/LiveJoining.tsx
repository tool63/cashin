"use client"

import { useEffect, useRef } from "react"

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
const TOTAL_ROWS = 40

const createJoin = (usedNames: Set<string>): LiveJoin => {
  let name = ""
  do {
    name = names[Math.floor(Math.random() * names.length)]
  } while (usedNames.has(name))
  usedNames.add(name)

  const scrollTime = 0.5 + Math.random() * 2.5 // faster scroll
  return {
    id: Date.now() + Math.random(),
    name,
    flag: randomCountry().flag,
    time: randomTime(),
    speed: ROW_HEIGHT / (scrollTime * FPS),
    gradientOffset: Math.random() * 360,
  }
}

/* ================= COMPONENT ================= */

export default function LiveJoining() {
  const listRef = useRef<HTMLUListElement>(null)
  const rowsData = useRef<LiveJoin[]>([])

  // Populate rows immediately on mount
  useEffect(() => {
    const used = new Set<string>()
    rowsData.current = Array.from({ length: TOTAL_ROWS }, () =>
      createJoin(used)
    )

    const ul = listRef.current
    if (!ul) return

    ul.innerHTML = ""
    rowsData.current.forEach((row) => {
      const li = document.createElement("li")
      li.className =
        "grid grid-cols-3 items-center border rounded-xl p-3 text-sm md:text-base text-white"
      li.innerHTML = `
        <span class="font-semibold truncate">${row.name}</span>
        <span class="text-center text-lg">${row.flag}</span>
        <span class="opacity-80 text-center">${row.time}</span>
      `
      li.style.marginBottom = "0px"
      li.style.background = `linear-gradient(90deg, hsl(${row.gradientOffset},100%,50%), hsl(${(row.gradientOffset+120)%360},100%,50%), hsl(${(row.gradientOffset+240)%360},100%,50%))`
      ul.appendChild(li)
    })
  }, [])

  // Animate rows purely in DOM
  useEffect(() => {
    let raf: number
    const animate = () => {
      const ul = listRef.current
      if (!ul) return

      const rows = Array.from(ul.children) as HTMLLIElement[]
      rows.forEach((row, i) => {
        const data = rowsData.current[i]
        if (!data) return

        let mb = parseFloat(row.style.marginBottom || "0")
        mb += data.speed
        row.style.marginBottom = `${mb}px`

        data.gradientOffset += 1
        row.style.background = `linear-gradient(90deg, hsl(${data.gradientOffset},100%,50%), hsl(${(data.gradientOffset+120)%360},100%,50%), hsl(${(data.gradientOffset+240)%360},100%,50%))`
      })

      const last = rows[rows.length - 1]
      if (last) {
        const height = last.offsetHeight
        const mb = parseFloat(last.style.marginBottom || "0")
        if (mb >= height) {
          rows.forEach((r) => (r.style.marginBottom = "0"))

          // Add new row on top
          const used = new Set(rowsData.current.map((r) => r.name))
          const newRow = createJoin(used)
          rowsData.current.pop()
          rowsData.current.unshift(newRow)

          // Update DOM for new row
          const firstLi = rows[0] as HTMLLIElement
          firstLi.querySelector("span.font-semibold")!.textContent = newRow.name
          firstLi.querySelector("span.text-lg")!.textContent = newRow.flag
          firstLi.querySelector("span.opacity-80")!.textContent = newRow.time
        }
      }

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

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

        <ul ref={listRef} className="space-y-2"></ul>
      </div>
    </div>
  )
}
