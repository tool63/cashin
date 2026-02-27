const STOP_WORDS = new Set([
  "the",
  "is",
  "and",
  "or",
  "a",
  "an",
  "to",
  "of",
  "in",
  "on",
  "for",
  "with",
  "by",
  "at",
  "from",
  "as",
  "that",
  "this",
  "it",
  "be",
  "are",
]);

interface KeywordOptions {
  limit?: number;
  minLength?: number;
}

export function generateKeywords(
  content: string,
  options: KeywordOptions = {}
): string[] {
  const { limit = 20, minLength = 4 } = options;

  if (!content) return [];

  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(
      (word) =>
        word.length >= minLength && !STOP_WORDS.has(word)
    );

  // Remove duplicates
  const uniqueWords = Array.from(new Set(words));

  // Return limited keywords
  return uniqueWords.slice(0, limit);
}
