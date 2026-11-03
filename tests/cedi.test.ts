import { describe, it, expect } from "vitest";
import { formatCedi } from "../src/cedi";

describe("formatCedi", () => {
  it("formats amounts", () => {
    expect(formatCedi(1250)).toBe("GH₵1,250.00");
    expect(formatCedi(0)).toBe("GH₵0.00");
    expect(formatCedi(1234567.891)).toBe("GH₵1,234,567.89");
    expect(formatCedi(5.5)).toBe("GH₵5.50");
  });

  it("handles strings and negatives", () => {
    expect(formatCedi("1,250.5")).toBe("GH₵1,250.50");
    expect(formatCedi(-300)).toBe("-GH₵300.00");
  });

  it("supports options", () => {
    expect(formatCedi(1250, { symbol: "GHS " })).toBe("GHS 1,250.00");
    expect(formatCedi(1250, { decimals: 0 })).toBe("GH₵1,250");
  });

  it("returns null for invalid input", () => {
    expect(formatCedi(NaN)).toBeNull();
    expect(formatCedi("abc")).toBeNull();
    expect(formatCedi(Infinity)).toBeNull();
  });
});
