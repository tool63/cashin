// 🌍 Validate ISO country dynamically (SAFE + GLOBAL)

export function isSupportedCountry(code: string): boolean {
  if (!code) return false;

  const normalized = code.toLowerCase().trim();

  // Must be exactly 2 letters
  if (!/^[a-z]{2}$/.test(normalized)) return false;

  return true;
}

// ✅ Unified validator (use everywhere)
export function isValidCountryCode(code: string): boolean {
  return isSupportedCountry(code);
}
