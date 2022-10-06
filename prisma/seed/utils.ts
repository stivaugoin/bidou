import data from "./data";

export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomValue<T>(array: T[]): T {
  return array[randomNumber(0, array.length - 1)];
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

export function isDateBeforeNMonthFromToday(date: Date, n: number): boolean {
  const today = new Date();
  return date.valueOf() < today.setMonth(today.getMonth() + n);
}

export function dateIsPast(date: Date): boolean {
  const today = new Date();
  return date.valueOf() < today.valueOf();
}

export function mapExpense(provider: typeof data.providers[number]) {
  return (date: Date) => {
    return {
      amount: randomNumber(
        provider.expenses.amount[0],
        provider.expenses.amount[1]
      ),
      date,
      Provider: { connect: { id: provider.id } },
    };
  };
}
export function mapIncome(category: typeof data.categories[number]) {
  return (date: Date) => {
    return {
      amount: randomValue([100000, 150000, 200000, 250000, 300000]),
      date,
      Category: { connect: { id: category.id } },
    };
  };
}
