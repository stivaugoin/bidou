import { CategoryType } from "@prisma/client";

export interface SeedCategoryBase {
  id: string;
  name: string;
  type: CategoryType;
}

export interface SeedCategory extends SeedCategoryBase {
  subCategories?: SeedSubCategory[];
}

export interface SeedSubCategory extends SeedCategoryBase {
  expenses: {
    amount: [number, number];
    countByMonth: [number, number];
  };
}

const categories: SeedCategory[] = [
  {
    id: "62dc7761f936486d54cf0db1",
    name: "Food",
    type: CategoryType.Expense,
    subCategories: [
      {
        id: "62dc7761f936486d54cf0dc1",
        name: "Restaurant",
        type: CategoryType.Expense,
        expenses: { amount: [1500, 7500], countByMonth: [1, 8] },
      },
      {
        id: "62dc7761f936486d54cf0dc2",
        name: "Grocery",
        type: CategoryType.Expense,
        expenses: { amount: [2500, 25000], countByMonth: [4, 10] },
      },
    ],
  },
  {
    id: "62dc7761f936486d54cf0db2",
    name: "House",
    type: CategoryType.Expense,
    subCategories: [
      {
        id: "62dc7761f936486d54cf0dc3",
        name: "Electricity",
        type: CategoryType.Expense,
        expenses: { amount: [10000, 30000], countByMonth: [1, 1] },
      },
      {
        id: "62dc7761f936486d54cf0dc4",
        name: "Mortgage",
        type: CategoryType.Expense,
        expenses: { amount: [90000, 120000], countByMonth: [1, 1] },
      },
      {
        id: "62dc7761f936486d54cf0dc5",
        name: "House insurance",
        type: CategoryType.Expense,
        expenses: { amount: [10000, 30000], countByMonth: [1, 1] },
      },
    ],
  },
  {
    id: "62dc7761f936486d54cf0db3",
    name: "Car",
    type: CategoryType.Expense,
    subCategories: [
      {
        id: "62dc7761f936486d54cf0dc6",
        name: "Car insurance",
        type: CategoryType.Expense,
        expenses: { amount: [10000, 30000], countByMonth: [1, 1] },
      },
      {
        id: "62dc7761f936486d54cf0dc7",
        name: "Gas",
        type: CategoryType.Expense,
        expenses: { amount: [2000, 5000], countByMonth: [1, 3] },
      },
      {
        id: "62dc7761f936486d54cf0dc8",
        name: "Garage",
        type: CategoryType.Expense,
        expenses: { amount: [4000, 30000], countByMonth: [0, 1] },
      },
    ],
  },
  {
    id: "62dc7761f936486d54cf0db4",
    name: "Deposit by Han Solo",
    type: CategoryType.Income,
  },
  {
    id: "62dc7761f936486d54cf0db5",
    name: "Deposit by Leia Skywalker",
    type: CategoryType.Income,
  },
];

const data = { categories };
export default data;
