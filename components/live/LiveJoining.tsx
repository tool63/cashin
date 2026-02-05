"use client"

import { useEffect, useRef, useState } from "react"

/* ================= DATA ================= */

const names = [
  "Alex","Emma","Liam","Noah","Olivia","Sophia","James","Daniel",
  "Ava","Lucas","Mia","Ethan","Amelia","Benjamin","Henry","Ella",
  "Jack","Leo","Grace","Arjun","Ayaan","Rahul","Sofia",
]

const countries = ["🇺🇸","🇬🇧","🇨🇦","🇩🇪","🇫🇷","🇮🇳","🇯🇵","🇧🇷"]

const randomTime = () =>
  `${Math.floor(Math.random() * 10) + 1}s ago`

/* ================= TYPES ================= */

interface JoinItem {
  id: number
  name: string
  flag: string
  time: string
  speed: number
}

/* ================= HELPERS ================= */

const ROW_HEIGHT = 48
const FPS = 60

const createJoin = (used: Set<string>): JoinItem => {
  let name = ""
  do {
    name = names[Math.floor(Math.random() * names.length)]
  } while (used.has(name))

  used.add(name)

  return {
    id: Date.now() + Math.random(),
    name,
    flag: countries[Math.floor(Math.random() * countries.length)],
    time: randomTime(),
    speed: ROW_HEIGHT / ((1 + Math.random() * 11) * FPS),
  }
}

/* ================= COMPONENT ================= */

export default function LiveJoining() {
  const [items, setItems] = useState<JoinItem[]>([])
  const listRef = useRef<HTMLUListElement>(null)
  const usedNames = useRef<Set<string>>(new Set())
  const started = useRef(false)

  /* INITIAL LOAD (FAST) */
  useEffect(() => {
    const initial: JoinItem[] = []
    for (let i = 0; i < 20; i++) {
      initial.push(createJoin(usedNames.current))
    }
    setItems(initial)
  }, [])

  /* ANIMATION */
  useEffect(() => {
    if (started.current) return
    started.current = true

    let raf: number

    const animate = () => {
      const list = listRef.current
      if (!list) return

      const rows = list.children as HTMLCollectionOf<HTMLLIElement>

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        const item = items[i]
        if (!item) continue

        let mb = parseFloat(row.dataset.mb || "0")
        mb += item.speed
        row.dataset.mb = mb.toString()
        row.style.marginBottom = `${mb}px`
      }

      const last = rows[rows.length - 1]
      if (last) {
        const mb = parseFloat(last.dataset.mb || "0")
        if (mb >= ROW_HEIGHT) {
          last.dataset.mb = "0"
          last.style.marginBottom = "0"

          setItems((prev) => {
            const next = [...prev]
            next.pop()
            next.unshift(createJoin(usedNames.current))
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

      <div className="overflow-hidden h-[360px] rounded-xl px-2 py-2">
        <div className="grid grid-cols-3 text-center mb-2 text-white font-semibold">
          <span className="hidden md:block">Name</span>
          <span className="hidden md:block">Country</span>
          <span className="hidden md:block">Time</span>
        </div>

        <ul ref={listRef} className="space-y-2">
          {items.map((j) => (
            <li
              key={j.id}
              className="grid grid-cols-3 items-center border rounded-xl p-3 text-sm text-white"
            >
              <span className="font-semibold truncate">{j.name}</span>
              <span className="text-center text-lg">{j.flag}</span>
              <span className="opacity-80 text-center">{j.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
