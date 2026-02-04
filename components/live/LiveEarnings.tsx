"use client"

import { useLiveEngine } from "./engine/LiveEngine"

export default function LiveEarnings() {
  const items = useLiveEngine("earn")

  return (
    <LiveWrapper title="💸 Live Earnings">
      {items.map((i) => (
        <Row key={i.id}>
          <span>{i.flag} {i.user}</span>
          <span className="text-green-500 font-semibold">{i.amount}</span>
          <span>{i.time}</span>
        </Row>
      ))}
    </LiveWrapper>
  )
}
