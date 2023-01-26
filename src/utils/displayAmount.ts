import { CategoryType } from "@prisma/client";
import { CURRENCY, LOCALE } from "./constant";

export default function displayAmount(amount: number, type?: CategoryType) {
  const modifier = type === CategoryType.Expense ? -1 : 1;

  return new Intl.NumberFormat(LOCALE, {
    currency: CURRENCY,
    style: "currency",
    currencyDisplay: "narrowSymbol",
  }).format((amount * modifier) / 100);
}
