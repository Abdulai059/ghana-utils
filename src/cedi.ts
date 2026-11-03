export interface FormatCediOptions {
  /** Currency symbol. Default "GH₵". */
  symbol?: string;
  /** Number of decimal places. Default 2. */
  decimals?: number;
}

/** Formats a number as cedis, e.g. 1250 -> "GH₵1,250.00". Returns null for invalid input. */
export function formatCedi(
  amount: number | string,
  options: FormatCediOptions = {}
): string | null {
  const { symbol = "GH₵", decimals = 2 } = options;

  const value = typeof amount === "string" ? Number(amount.replace(/,/g, "")) : amount;
  if (typeof value !== "number" || !Number.isFinite(value)) return null;

  const abs = Math.abs(value).toFixed(decimals);
  const [whole, fraction] = abs.split(".");
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const body = fraction ? `${withCommas}.${fraction}` : withCommas;

  return (value < 0 ? "-" : "") + symbol + body;
}
