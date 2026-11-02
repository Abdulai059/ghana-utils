import { describe, it, expect } from "vitest";
import { normalizePhone, validatePhone, getNetwork } from "../src/phone";

describe("normalizePhone", () => {
  it("handles all common formats", () => {
    expect(normalizePhone("0244123456")).toBe("+233244123456");
    expect(normalizePhone("+233244123456")).toBe("+233244123456");
    expect(normalizePhone("233244123456")).toBe("+233244123456");
    expect(normalizePhone("00233244123456")).toBe("+233244123456");
    expect(normalizePhone("024 412 3456")).toBe("+233244123456");
    expect(normalizePhone("024-412-3456")).toBe("+233244123456");
  });

  it("returns null for bad input", () => {
    expect(normalizePhone("")).toBeNull();
    expect(normalizePhone("12345")).toBeNull();
    expect(normalizePhone("024412345")).toBeNull();
    expect(normalizePhone("02441234567")).toBeNull();
    expect(normalizePhone("0999123456")).toBeNull();
    expect(normalizePhone("abcdefghij")).toBeNull();
  });
});

describe("validatePhone", () => {
  it("returns true or false", () => {
    expect(validatePhone("0201234567")).toBe(true);
    expect(validatePhone("0991234567")).toBe(false);
  });
});

describe("getNetwork", () => {
  it("detects the network", () => {
    expect(getNetwork("0244123456")).toBe("MTN");
    expect(getNetwork("0201234567")).toBe("Telecel");
    expect(getNetwork("0261234567")).toBe("AirtelTigo");
    expect(getNetwork("+233571234567")).toBe("AirtelTigo");
  });

  it("returns null for invalid numbers", () => {
    expect(getNetwork("hello")).toBeNull();
  });
});
