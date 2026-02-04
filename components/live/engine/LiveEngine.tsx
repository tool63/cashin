"use client"

import { useEffect, useRef } from "react"

interface LiveEngineProps<T> {
  items: T[]
  setItems: React.Dispatch<React.SetStateAction<T[]>>
  renderRow: (item: T) => React.ReactNode
  height?: string
}

export default function LiveEngine<T>({
  items,
  setItems,
  renderRow,
  height = "h-[360px] md:h-[400px]",
}: LiveEngineProps<T>) {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    let raf: number

    const animate = () => {
      if (!listRef.current) return
      const rows = Array.from(listRef.current.children) as HTMLLIElement[]

      rows.forEach((row, i) => {
        const item: any = items[i]

        let mb = parseFloat(row.style.marginBottom || "0")
        mb += item.speed
        row.style.marginBottom = `${mb}px`

        item.slideOffset += 0.1 * item.slideDir
        if (item.slideOffset > 8 || item.slideOffset < -8) item.slideDir *= -1

        const username = row.querySelector(".username") as HTMLElement
        if (username)
          username.style.transform = `translateX(${item.slideOffset}px)`

        item.gradientOffset += 0.4
        row.style.background = `linear-gradient(
          90deg,
          hsl(${item.gradientOffset},100%,50%),
          hsl(${(item.gradientOffset + 120) % 360},100%,50%),
          hsl(${(item.gradientOffset + 240) % 360},100%,50%)
        )`
      })

      const last = rows[rows.length - 1]
      if (last && parseFloat(last.style.marginBottom || "0") >= last.offsetHeight) {
        setItems((prev: any[]) => {
          const next = [...prev]
          const moved = next.pop()
          if (moved) {
            moved.slideOffset = 0
            moved.slideDir = 1
            moved.gradientOffset = Math.random() * 360
            moved.time = `${Math.floor(Math.random() * 10) + 1}s ago`
            next.unshift(moved)
          }
          rows.forEach((r) => (r.style.marginBottom = "0"))
          return next
        })
      }

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [items, setItems])

  return (
    <div className={`overflow-hidden ${height} rounded-xl px-2 py-2`}>
      <ul ref={listRef} className="space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="border rounded-xl p-3 text-sm md:text-base relative"
          >
            {renderRow(item)}
          </li>
        ))}
      </ul>
    </div>
  )
}
