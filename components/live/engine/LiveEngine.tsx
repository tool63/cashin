"use client"

import { useEffect, useState } from "react"
import { randomUser, randomCountry, randomAmount, randomMethod } from "./liveUtils"

export interface LiveItem {
  id: number
  user: string
  flag: string
  country?: string
  method?: string
  amount?: string
  time: string
}

export function useLiveEngine(type: "join" | "earn" | "withdraw" | "offer") {
  const [items, setItems] = useState<LiveItem[]>([])

  useEffect(() => {
    const init = Array.from({ length: 8 }, (_, i) => createItem(i))
    setItems(init)

    const interval = setInterval(() => {
      setItems((prev) => {
        const next = [...prev]
        next.pop()
        next.unshift(createItem(Date.now()))
        return next
      })
    }, 1800)

    return () => clearInterval(interval)
  }, [])

  function createItem(id: number): LiveItem {
    const user = randomUser()
    const country = randomCountry()

    return {
      id,
      user,
      flag: country.flag,
      country: country.name,
      method: type === "withdraw" ? randomMethod() : undefined,
      amount:
        type === "earn"
          ? randomAmount(0.1, 3)
          : type === "withdraw"
          ? randomAmount(5, 50)
          : undefined,
      time: `${Math.floor(Math.random() * 9) + 1}s ago`,
    }
  }

  return items
}
