"use client"

import { useLiveEngine } from "./engine/LiveEngine"

export default function LiveWithdrawals() {
  const items = useLiveEngine("withdraw")

  return (
    <LiveWrapper title="🏦 Live Withdrawals">
      {items.map((i) => (
        <Row key={i.id}>
          <span>{i.flag} {i.user}</span>
          <span>{i.method}</span>
          <span className="text-green-500 font-semibold">{i.amount}</span>
          <span>{i.time}</span>
        </Row>
      ))}
    </LiveWrapper>
  )
}
