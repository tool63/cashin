// app/[slug]/page.tsx
import { useParams } from 'next/navigation'

export default function DynamicPage() {
  const params = useParams() // { slug: 'something' }
  return (
    <main>
      <h1>Dynamic Page: {params.slug}</h1>
    </main>
  )
}
