import dayjs from "dayjs";
import { SeedCategory } from "./data";

// TODO: Find a way to uses it from global.d.ts
type Override<T, U> = Omit<T, keyof U> & U;

export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomDatesByMonth(
  n: number,
  month: number,
  year: number
): Date[] {
  const dates = [];
  for (let i = 0; i < n; i++) {
    dates.push(new Date(year, month, randomNumber(1, 31)));
  }
  return dates;
}

export function dateIsPast(date: Date): boolean {
  const today = new Date();
  return date.valueOf() < today.valueOf();
}

type SeedCategoryWithTransactions = Override<
  SeedCategory,
  { transactions: NonNullable<SeedCategory["transactions"]> }
>;

export function mapTransaction(category: SeedCategoryWithTransactions) {
  return (date: Date) => {
    const [min, max] = category.transactions.amount;
    return {
      amount: randomNumber(min, max),
      categoryId: category.id,
      date,
      type: category.type,
    };
  };
}

export function getCategoriesWithTransactions(categories: SeedCategory[]) {
  const flatCategories = categories.flatMap((category) => {
    if (category.subCategories) return category.subCategories;
    return category;
  });
  return flatCategories.filter(
    (category) => category.transactions
  ) as SeedCategoryWithTransactions[];
}

export function getYears(count: number) {
  return Array.from({ length: count })
    .map((_, i) => dayjs().year() - i)
    .reverse();
}
