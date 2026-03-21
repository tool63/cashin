// 🌍 Validate ISO country dynamically (NO LIST NEEDED)
export function isSupportedCountry(code: string): boolean {
  if (!code) return false;

  const normalized = code.toLowerCase().trim();

  // Must be 2 letters
  if (!/^[a-z]{2}$/.test(normalized)) return false;

  // OPTIONAL: validate using Intl API (real countries only)
  try {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return !!regionNames.of(normalized.toUpperCase());
  } catch {
    return true; // fallback (still allow if Intl fails)
  }
}
