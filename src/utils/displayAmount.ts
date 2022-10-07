import { CURRENCY, LOCALE } from "./constant";

export default function displayAmount(amount: number) {
  return new Intl.NumberFormat(LOCALE, {
    currency: CURRENCY,
    style: "currency",
    currencyDisplay: "narrowSymbol",
  }).format(amount / 100);
}
