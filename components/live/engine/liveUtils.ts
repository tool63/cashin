const names = ["Alex", "Mia", "John", "Sara", "Leo", "Emma", "Noah", "Liam"]
const countries = [
  { name: "USA", flag: "🇺🇸" },
  { name: "UK", flag: "🇬🇧" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "India", flag: "🇮🇳" },
]

const methods = ["PayPal", "USDT", "Bitcoin", "Gift Card"]

export const randomUser = () =>
  names[Math.floor(Math.random() * names.length)] +
  Math.floor(Math.random() * 1000)

export const randomCountry = () =>
  countries[Math.floor(Math.random() * countries.length)]

export const randomAmount = (min: number, max: number) =>
  `$${(Math.random() * (max - min) + min).toFixed(2)}`

export const randomMethod = () =>
  methods[Math.floor(Math.random() * methods.length)]
