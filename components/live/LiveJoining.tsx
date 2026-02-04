"use client"

import { useLiveEngine } from "./engine/LiveEngine"

export default function LiveJoining() {
  const items = useLiveEngine("join")

  return (
    <LiveWrapper title="🔥 Live Joining">
      {items.map((i) => (
        <Row key={i.id}>
          <span>{i.flag} {i.user}</span>
          <span className="text-purple-400">Joined</span>
          <span>{i.time}</span>
        </Row>
      ))}
    </LiveWrapper>
  )
}
