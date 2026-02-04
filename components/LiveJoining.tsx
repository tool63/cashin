"use client"

import { useEffect, useRef, useState } from "react"

// Countries and flags
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

// Random username generator
function randomName() {
  const names = ["Alex", "Mia", "John", "Sara", "Leo", "Emma", "Chris", "Liam", "Olivia", "Noah"]
  const numbers = Math.floor(Math.random() * 100)
  return names[Math.floor(Math.random() * names.length)] + numbers
}

// Random glow color generator
const glowColors = ["#00FFFF", "#00FF00", "#FF00FF", "#FFFF00", "#FFA500", "#FF4500"]

interface LiveUser {
  username: string
  country: string
  flag: string
  time: string
  speed: number
  slideOffset?: number
  slideDir?: number
  flash?: boolean
  flagBounce?: boolean
  glowColor?: string
  bgSpeed?: number
  bgIntensity?: number
  rippleOffset?: number
}

// Generate 100 users
const generateUsers = (): LiveUser[] =>
  Array.from({ length: 100 }, () => {
    const c = countries[Math.floor(Math.random() * countries.length)]
    const rowHeight = 48
    const fps = 60
    const scrollTime = 1 + Math.random() * 11
    const speed = rowHeight / (scrollTime * fps)
    return {
      username: randomName(),
      country: c.name,
      flag: c.flag,
      time: `${Math.floor(Math.random() * 10) + 1}s ago`,
      speed,
      slideOffset: 0,
      slideDir: 1,
      flash: false,
      flagBounce: false,
      glowColor: glowColors[Math.floor(Math.random() * glowColors.length)],
      bgSpeed: 0.5 + Math.random() * 1.5,
      bgIntensity: 5 + Math.random() * 10,
      rippleOffset: Math.random() * 100,
    }
  })

export default function LiveJoining() {
  const [users, setUsers] = useState<LiveUser[]>(generateUsers())
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    let animationFrame: number

    const scrollStep = () => {
      if (!listRef.current) return
      const listItems = Array.from(listRef.current.children) as HTMLLIElement[]

      listItems.forEach((item, index) => {
        const user = users[index]

        // Vertical scrolling
        let margin = parseFloat(item.style.marginBottom || "0")
        margin += user.speed
        item.style.marginBottom = `${margin}px`

        // Horizontal slide for username
        if (user.slideOffset === undefined) user.slideOffset = 0
        if (user.slideDir === undefined) user.slideDir = 1
        const maxSlide = 8
        user.slideOffset += 0.1 * user.slideDir
        if (user.slideOffset > maxSlide || user.slideOffset < -maxSlide) user.slideDir *= -1
        const usernameSpan = item.querySelector("span.username") as HTMLSpanElement
        if (usernameSpan) usernameSpan.style.transform = `translateX(${user.slideOffset}px)`

        // Flag bounce
        const flagSpan = item.querySelector("span.flag") as HTMLSpanElement
        if (flagSpan) flagSpan.classList.toggle("animate-bounce", !!user.flagBounce)

        // VIP top 3 highlight and faster pulse
        if (index < 3) {
          const vipSpeed = 0.3 + index * 0.1 // faster animation for VIP
          item.style.boxShadow = `0 0 ${10 + index * 5}px ${user.glowColor}`
          item.style.animation = `glowBg ${vipSpeed}s infinite`
          usernameSpan.style.animation = `glowText ${vipSpeed}s infinite`
          if (flagSpan) flagSpan.style.animation = `glowText ${vipSpeed}s infinite`
        } else {
          item.style.boxShadow = "none"
          item.style.animation = `glowBg ${user.bgSpeed}s infinite`
          usernameSpan.style.animation = `glowText ${user.bgSpeed}s infinite`
          if (flagSpan) flagSpan.style.animation = `glowText ${user.bgSpeed}s infinite`
        }
      })

      // Move last item to top
      const lastItem = listItems[listItems.length - 1]
      if (lastItem) {
        const lastHeight = lastItem.offsetHeight
        const lastMargin = parseFloat(lastItem.style.marginBottom || "0")
        if (lastMargin >= lastHeight) {
          setUsers((prev) => {
            const next = [...prev]
            const moved = next.pop()
            if (moved) {
              moved.time = `${Math.floor(Math.random() * 10) + 1}s ago`
              const rowHeight = 48
              const fps = 60
              const scrollTime = 1 + Math.random() * 11
              moved.speed = rowHeight / (scrollTime * fps)
              moved.slideOffset = 0
              moved.slideDir = 1
              moved.flash = true
              moved.flagBounce = true
              moved.glowColor = glowColors[Math.floor(Math.random() * glowColors.length)]
              moved.bgSpeed = 0.5 + Math.random() * 1.5
              moved.bgIntensity = 5 + Math.random() * 10
              moved.rippleOffset = Math.random() * 100
              next.unshift(moved)
            }
            listItems.forEach((li) => (li.style.marginBottom = "0"))
            return next
          })

          setTimeout(() => {
            setUsers((prev) =>
              prev.map((u, i) =>
                i === 0 ? { ...u, flash: false, flagBounce: false } : u
              )
            )
          }, 700)
        }
      }

      animationFrame = requestAnimationFrame(scrollStep)
    }

    animationFrame = requestAnimationFrame(scrollStep)
    return () => cancelAnimationFrame(animationFrame)
  }, [users])

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
        Live Joining
      </h3>

      {/* Table header */}
      <div className="grid grid-cols-3 gap-4 md:grid-cols-3 text-center mb-2">
        <span className="font-semibold hidden md:block">Username</span>
        <span className="font-semibold hidden md:block">Country</span>
        <span className="font-semibold hidden md:block">Time</span>
      </div>

      {/* Auto-scrolling list */}
      <div className="overflow-hidden h-[360px] md:h-[400px] relative">
        <ul ref={listRef} className="space-y-2">
          {users.map((user, idx) => (
            <li
              key={idx}
              className={`flex justify-between items-center border rounded-xl p-3 text-sm md:text-base relative`}
              style={{
                "--glow-color": user.glowColor,
                "--bg-speed": `${user.bgSpeed}s`,
                "--bg-intensity": `${user.bgIntensity}px`,
                "--ripple-offset": `${user.rippleOffset}px`,
              } as any}
            >
              <span className="username font-semibold z-10 relative">{user.username}</span>
              <span className="flex items-center justify-center gap-2 z-10 relative">
                <span className="flag">{user.flag}</span>
                <span className="hidden md:inline">{user.country}</span>
              </span>
              <span className="text-gray-600 dark:text-gray-400 z-10 relative">{user.time}</span>

              {/* Neon ripple effect */}
              <span
                className="absolute inset-0 rounded-xl opacity-40 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at var(--ripple-offset) 50%, var(--glow-color), transparent 70%)`,
                  animation: `ripple var(--bg-speed) infinite`,
                }}
              ></span>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        @keyframes glowText {
          0%,100% { text-shadow: 0 0 0px var(--glow-color); }
          50% { text-shadow: 0 0 var(--bg-intensity) var(--glow-color); }
        }
        @keyframes glowBg {
          0%,100% { background-color: rgba(0,0,0,0.05); }
          50% { background-color: var(--glow-color, #00FFFF)/20; }
        }
        @keyframes ripple {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        li span.username,
        li span.flag {
          animation: glowText var(--bg-speed) infinite;
        }
        li {
          animation: glowBg var(--bg-speed) infinite;
        }
      `}</style>
    </div>
  )
}
