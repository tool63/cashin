// components/homepage/engine/LiveEngine.tsx
"use client"

import { useEffect, useRef } from "react"
import { useLiveEngine } from "./useLiveEngine"

interface Props {
  title: string
  type: "join" | "earn" | "withdraw" | "offer"
}

export default function LiveEngine({ title, type }: Props) {
  const { items, recycle } = useLiveEngine(type)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    let raf: number

    const animate = () => {
      if (!listRef.current) return
      const rows = Array.from(listRef.current.children) as HTMLLIElement[]

      rows.forEach((row, i) => {
        const item = items[i]
        if (!item) return

        let mb = parseFloat(row.style.marginBottom || "0")
        mb += item.speed
        row.style.marginBottom = `${mb}px`

        item.gradientOffset += 0.5
        row.style.background = `linear-gradient(
          90deg,
          hsl(${item.gradientOffset},100%,50%),
          hsl(${(item.gradientOffset + 120) % 360},100%,50%),
          hsl(${(item.gradientOffset + 240) % 360},100%,50%)
        )`
      })

      const last = rows[rows.length - 1]
      if (last) {
        const h = last.offsetHeight
        const mb = parseFloat(last.style.marginBottom || "0")
        if (mb >= h) {
          rows.forEach((r) => (r.style.marginBottom = "0"))
          recycle()
        }
      }

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [items, recycle])

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-white">
        {title}
      </h3>

      <div className="overflow-hidden h-[360px] md:h-[400px] rounded-xl px-2 py-2">
        <ul ref={listRef} className="space-y-2">
          {items.map((i) => (
            <li
              key={i.id}
              className="flex justify-between items-center border rounded-xl p-3 text-sm md:text-base text-white"
            >
              <span className="font-semibold">{i.user}</span>
              <span className="flex gap-2">
                <span>{i.flag}</span>
                <span className="hidden md:inline">{i.country}</span>
              </span>
              <span className="opacity-80">
                {type === "earn"
                  ? i.amount
                  : type === "withdraw"
                  ? i.method
                  : i.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
