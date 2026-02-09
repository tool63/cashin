"use client"

import { useState } from "react"
import {
  randomUser,
  randomCountry,
  randomAmount,
  randomMethod,
  glowColors,
} from "./liveUtils"

export interface LiveItem {
  id: number
  user: string
  country: string
  flag: string
  time?: string
  amount?: string
  method?: string
  speed: number
  gradientOffset: number
}

const ROW_HEIGHT = 48
const FPS = 60

const generateItem = (type: string, id: number): LiveItem => {
  const c = randomCountry()
  const scrollTime = 1 + Math.random() * 11

  return {
    id,
    user: randomUser(),
    country: c.name,
    flag: c.flag,
    time: `${Math.floor(Math.random() * 10) + 1}s ago`,
    amount: type === "earn" ? randomAmount(0.2, 12) : undefined,
    method: type === "withdraw" ? randomMethod() : undefined,
    speed: ROW_HEIGHT / (scrollTime * FPS),
    gradientOffset: Math.random() * 360,
  }
}

export function useLiveEngine(type: "join" | "earn" | "withdraw" | "offer") {
  const [items, setItems] = useState<LiveItem[]>(
    Array.from({ length: 100 }, (_, i) => generateItem(type, i))
  )

  const recycle = () => {
    setItems((prev) => {
      const next = [...prev]
      const moved = next.pop()
      if (moved) {
        const fresh = generateItem(type, moved.id)
        next.unshift(fresh)
      }
      return next
    })
  }

  return { items, recycle }
}
