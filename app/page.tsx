export default function Home() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 40 }}>
      <h1 style={{ fontSize: 36, fontWeight: "bold" }}>
        Payup – Earn Rewards Online
      </h1>

      <p style={{ marginTop: 12, fontSize: 18 }}>
        Earn real rewards by completing simple tasks like surveys, offers, and games.
      </p>

      <hr style={{ margin: "40px 0" }} />

      <h2 style={{ fontSize: 24, fontWeight: "bold" }}>
        How Payup Works
      </h2>

      <ol style={{ marginTop: 16, lineHeight: 1.8 }}>
        <li><strong>1.</strong> Sign up for free</li>
        <li><strong>2.</strong> Complete tasks and offers</li>
        <li><strong>3.</strong> Withdraw your rewards</li>
      </ol>

      <hr style={{ margin: "40px 0" }} />

      <h2 style={{ fontSize: 24, fontWeight: "bold" }}>
        Why Choose Payup?
      </h2>

      <ul style={{ marginTop: 16, lineHeight: 1.8 }}>
        <li>✔ Trusted reward partners</li>
        <li>✔ Fast payouts</li>
        <li>✔ Mobile-friendly</li>
      </ul>
    </main>
  );
}
