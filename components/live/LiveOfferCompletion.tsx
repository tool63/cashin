"use client"

import { useLiveEngine } from "./engine/LiveEngine"

export default function LiveOfferCompletion() {
  const items = useLiveEngine("offer")

  return (
    <LiveWrapper title="✅ Live Offer Completion">
      {items.map((i) => (
        <Row key={i.id}>
          <span>{i.flag} {i.user}</span>
          <span className="text-cyan-400">Completed Offer</span>
          <span>{i.time}</span>
        </Row>
      ))}
    </LiveWrapper>
  )
}
