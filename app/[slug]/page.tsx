// app/[slug]/page.tsx
import { useParams } from 'next/navigation'

export default function DynamicPage() {
  const params = useParams()
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Dynamic Page</h1>
      <p>Slug: {params.slug}</p>
    </main>
  )
}
