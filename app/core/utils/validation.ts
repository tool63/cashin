// 🌍 Global ISO validation (auto, no list)
export function isSupportedCountry(code: string): boolean {
  if (!code) return false;

  const normalized = code.toLowerCase().trim();

  // must be 2 letters
  if (normalized.length !== 2) return false;

  return /^[a-z]{2}$/.test(normalized);
}
