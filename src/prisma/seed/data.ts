import { CategoryType } from "@prisma/client";

const categories = [
  {
    id: "62dc7761f936486d54cf0db1",
    name: "Food",
    type: CategoryType.Expense,
  },
  {
    id: "62dc7761f936486d54cf0db2",
    name: "House",
    type: CategoryType.Expense,
  },
  {
    id: "62dc7761f936486d54cf0db3",
    name: "Car",
    type: CategoryType.Expense,
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

const providers = [
  // Food
  {
    id: "62dc7761f936486d54cf0dc1",
    name: "Restaurant",
    Category: { connect: { id: "62dc7761f936486d54cf0db1" } },
    expenses: { amount: [1500, 7500], countByMonth: [1, 8] },
  },
  {
    id: "62dc7761f936486d54cf0dc2",
    name: "Grocery",
    Category: { connect: { id: "62dc7761f936486d54cf0db1" } },
    expenses: { amount: [2500, 25000], countByMonth: [4, 10] },
  },

  // House
  {
    id: "62dc7761f936486d54cf0dc3",
    name: "Electricity",
    Category: { connect: { id: "62dc7761f936486d54cf0db2" } },
    expenses: { amount: [10000, 30000], countByMonth: [1, 1] },
  },
  {
    id: "62dc7761f936486d54cf0dc4",
    name: "Mortgage",
    Category: { connect: { id: "62dc7761f936486d54cf0db2" } },
    expenses: { amount: [90000, 120000], countByMonth: [1, 1] },
  },
  {
    id: "62dc7761f936486d54cf0dc5",
    name: "House insurance",
    Category: { connect: { id: "62dc7761f936486d54cf0db2" } },
    expenses: { amount: [10000, 30000], countByMonth: [1, 1] },
  },

  // Car
  {
    id: "62dc7761f936486d54cf0dc6",
    name: "Car insurance",
    Category: { connect: { id: "62dc7761f936486d54cf0db3" } },
    expenses: { amount: [10000, 30000], countByMonth: [1, 1] },
  },
  {
    id: "62dc7761f936486d54cf0dc7",
    name: "Gas",
    Category: { connect: { id: "62dc7761f936486d54cf0db3" } },
    expenses: { amount: [2000, 5000], countByMonth: [1, 3] },
  },
  {
    id: "62dc7761f936486d54cf0dc8",
    name: "Garage",
    Category: { connect: { id: "62dc7761f936486d54cf0db3" } },
    expenses: { amount: [4000, 30000], countByMonth: [0, 1] },
  },
];

const data = { categories, providers };
export default data;
