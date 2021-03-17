import { formatAmount } from "../formatAmount";

test("formatAmount", () => {
  expect(formatAmount(1)).toBe("$0.01");
  expect(formatAmount(12)).toBe("$0.12");
  expect(formatAmount(123)).toBe("$1.23");
  expect(formatAmount(1234)).toBe("$12.34");
  expect(formatAmount(12345)).toBe("$123.45");
  expect(formatAmount(123456)).toBe("$1,234.56");
  expect(formatAmount(10000)).toBe("$100.00");
});
