import { SeedCategory } from "./data";

/**
 * Represents a type that overrides properties of another type.
 * @template T - The original type.
 * @template U - The type containing the properties to override.
 */
type Override<T, U> = Omit<T, keyof U> & U;

/**
 * Returns a random number between min (inclusive) and max (inclusive).
 * @param min - The minimum number.
 * @param max - The maximum number.
 * @returns A random number between min (inclusive) and max (inclusive).
 * @example
 * randomNumber(1, 10) // 5
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Generates an array of random dates for a given month and year.
 * @param n - The number of dates to generate.
 * @param month - The month (0-11).
 * @param year - The year.
 * @returns An array of random dates.
 */
export function getRandomDatesByMonth(
  n: number,
  month: number,
  year: number,
): Date[] {
  const dates = [];
  for (let i = 0; i < n; i++) {
    dates.push(new Date(year, month, randomNumber(1, 31)));
  }
  return dates;
}

/**
 * Checks if a given date is in the past.
 * @param date - The date to check.
 * @returns True if the date is in the past, false otherwise.
 */
export function dateIsPast(date: Date): boolean {
  const today = new Date();
  return date.valueOf() < today.valueOf();
}

type SeedCategoryWithTransactions = Override<
  SeedCategory,
  { transactions: NonNullable<SeedCategory["transactions"]> }
>;

/**
 * Maps a SeedCategoryWithTransactions object to a transaction object.
 * @param category - The SeedCategoryWithTransactions object.
 * @returns A function that maps a date to a transaction object.
 */
export function mapTransaction(category: SeedCategoryWithTransactions) {
  return (date: Date) => {
    const [min, max] = category.transactions.amount;
    return {
      amount: randomNumber(min, max),
      categoryId: category.id,
      date,
    };
  };
}

/**
 * Filters and returns seed categories that have transactions.
 * @param categories - The array of SeedCategory objects.
 * @returns An array of SeedCategoryWithTransactions objects.
 */
export function getCategoriesWithTransactions(categories: SeedCategory[]) {
  return categories
    .flatMap((category) => {
      if (category.subCategories) return category.subCategories;
      return category;
    })
    .filter(
      (category) => category.transactions,
    ) as SeedCategoryWithTransactions[];
}

/**
 * Generates an array of years starting from the current year and going back in time.
 * @param count - The number of years to generate.
 * @returns An array of years.
 */
export function getYears(count: number) {
  return Array.from({ length: count })
    .map((_, i) => new Date().getFullYear() - i)
    .reverse();
}
