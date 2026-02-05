import Head from "next/head"

interface MetaProps {
  title?: string
  description?: string
}

export default function Meta({ title, description }: MetaProps) {
  return (
    <Head>
      <title>{title || "Cashog - Earn Real Money Online"}</title>
      <meta
        name="description"
        content={
          description ||
          "Complete offers, play games, answer surveys and cash out instantly on Cashog."
        }
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
