export const countries = [
  { name: "USA", flag: "🇺🇸" },
  { name: "UK", flag: "🇬🇧" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "India", flag: "🇮🇳" },
]

export const names = ["Alex", "Mia", "John", "Sara", "Leo", "Emma", "Chris"]

export const withdrawMethods = ["PayPal", "Crypto", "Bank", "Gift Card"]

export const offers = ["Survey", "Game Install", "App Signup", "Quiz"]

export function baseItem() {
  return {
    speed: 48 / (60 * (1 + Math.random() * 10)),
    slideOffset: 0,
    slideDir: 1,
    gradientOffset: Math.random() * 360,
    time: `${Math.floor(Math.random() * 10) + 1}s ago`,
  }
}
