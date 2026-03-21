// 🌍 Validate country code (SAFE + GLOBAL READY)

export function isSupportedCountry(code: string): boolean {
  if (!code) return false;

  const normalized = code.toLowerCase().trim();

  // ✅ Allow "global" explicitly (NO URL prefix)
  if (normalized === "global") return true;

  // ✅ ISO country codes (2 letters)
  if (/^[a-z]{2}$/.test(normalized)) return true;

  return false;
}

// ===============================
// ✅ Unified validator (use everywhere)
// ===============================
export function isValidCountryCode(code: string): boolean {
  return isSupportedCountry(code);
}
