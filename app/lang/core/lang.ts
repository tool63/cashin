// app/lang/core/lang.ts

export type LanguageKey = "en" | "es"

export const LANG: Record<LanguageKey, {
  hero_title: string
  hero_description: string
  hero_cta: string
  hero_phrase_surveys?: string
  hero_phrase_apps?: string
  hero_phrase_games?: string
  hero_phrase_videos?: string
}> = {
  en: {
    hero_title: "Earn Real Money By",
    hero_description:
      "Complete offers, play games, answer surveys and cash out instantly.",
    hero_cta: "Start Earning Now",
    hero_phrase_surveys: "Surveys",
    hero_phrase_apps: "App Installs",
    hero_phrase_games: "Playing Games",
    hero_phrase_videos: "Watching Videos",
  },

  es: {
    hero_title: "Gana dinero real",
    hero_description:
      "Completa ofertas, juega, responde encuestas y cobra al instante.",
    hero_cta: "Comenzar ahora",
  },

  // 👉 add more languages below (fr, de, pt, etc.)
}
