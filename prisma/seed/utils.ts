import dayjs from "dayjs";
import { SeedCategory, SeedSubCategory } from "./data";

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

export function mapTransaction(category: SeedSubCategory) {
  return (date: Date) => {
    const [min, max] = category.transactions.amount;
    return {
      amount: randomNumber(min, max),
      categoryId: category.id,
      date,
    };
  };
}

export function getCategories(categories: SeedCategory[]) {
  return categories.flatMap((category) => {
    if (category.subCategories) return category.subCategories;
    return [];
  });
}

export function getYears(count: number) {
  return Array.from({ length: count })
    .map((_, i) => dayjs().year() - i)
    .reverse();
}
