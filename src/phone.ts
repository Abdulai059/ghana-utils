export type Network = "MTN" | "Telecel" | "AirtelTigo" | "Glo";

const PREFIXES: Record<string, Network> = {
  "024": "MTN", "025": "MTN", "053": "MTN", "054": "MTN", "055": "MTN", "059": "MTN",
  "020": "Telecel", "050": "Telecel",
  "026": "AirtelTigo", "027": "AirtelTigo", "056": "AirtelTigo", "057": "AirtelTigo",
  "023": "Glo",
};

/** Returns +233XXXXXXXXX, or null if the number is invalid. */
export function normalizePhone(input: string): string | null {
  if (typeof input !== "string") return null;

  let n = input.replace(/[\s\-().]/g, "");

  if (n.startsWith("+233")) n = n.slice(4);
  else if (n.startsWith("00233")) n = n.slice(5);
  else if (n.startsWith("233")) n = n.slice(3);
  else if (n.startsWith("0")) n = n.slice(1);

  if (!/^\d{9}$/.test(n)) return null;
  if (!("0" + n.slice(0, 2) in PREFIXES)) return null;

  return "+233" + n;
}

export function validatePhone(input: string): boolean {
  return normalizePhone(input) !== null;
}

export function getNetwork(input: string): Network | null {
  const normalized = normalizePhone(input);
  if (!normalized) return null;
  return PREFIXES["0" + normalized.slice(4, 6)] ?? null;
}
