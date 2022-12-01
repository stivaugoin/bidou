import { Type } from "@prisma/client";

export interface SeedCategory {
  id: string;
  name: string;
  type: Type;
  transactions?: {
    amount: [number, number];
    countByMonth: [number, number];
  };
  subCategories?: SeedCategory[];
}

const categories: SeedCategory[] = [
  {
    id: "62dc7761f936486d54cf0db1",
    name: "Food",
    type: Type.Expense,
    subCategories: [
      {
        id: "62dc7761f936486d54cf0dc1",
        name: "Restaurant",
        type: Type.Expense,
        transactions: { amount: [1500, 7500], countByMonth: [1, 8] },
      },
      {
        id: "62dc7761f936486d54cf0dc2",
        name: "Grocery",
        type: Type.Expense,
        transactions: { amount: [2500, 25000], countByMonth: [4, 10] },
      },
    ],
  },
  {
    id: "62dc7761f936486d54cf0db2",
    name: "House",
    type: Type.Expense,
    subCategories: [
      {
        id: "62dc7761f936486d54cf0dc3",
        name: "Electricity",
        type: Type.Expense,
        transactions: { amount: [10000, 30000], countByMonth: [1, 1] },
      },
      {
        id: "62dc7761f936486d54cf0dc4",
        name: "Mortgage",
        type: Type.Expense,
        transactions: { amount: [90000, 120000], countByMonth: [1, 1] },
      },
      {
        id: "62dc7761f936486d54cf0dc5",
        name: "House insurance",
        type: Type.Expense,
        transactions: { amount: [10000, 30000], countByMonth: [1, 1] },
      },
    ],
  },
  {
    id: "62dc7761f936486d54cf0db3",
    name: "Car",
    type: Type.Expense,
    subCategories: [
      {
        id: "62dc7761f936486d54cf0dc6",
        name: "Car insurance",
        type: Type.Expense,
        transactions: { amount: [10000, 30000], countByMonth: [1, 1] },
      },
      {
        id: "62dc7761f936486d54cf0dc7",
        name: "Gas",
        type: Type.Expense,
        transactions: { amount: [2000, 5000], countByMonth: [1, 3] },
      },
      {
        id: "62dc7761f936486d54cf0dc8",
        name: "Garage",
        type: Type.Expense,
        transactions: { amount: [4000, 30000], countByMonth: [0, 1] },
      },
    ],
  },
  {
    id: "62dc7761f936486d54cf0db4",
    name: "Deposit by Han Solo",
    type: Type.Income,
    transactions: { amount: [100000, 300000], countByMonth: [1, 3] },
  },
  {
    id: "62dc7761f936486d54cf0db5",
    name: "Deposit by Leia Skywalker",
    type: Type.Income,
    transactions: { amount: [100000, 300000], countByMonth: [1, 3] },
  },
];

const data = { categories };
export default data;
