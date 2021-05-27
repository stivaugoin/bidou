import dayjs from "dayjs";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useCategories } from "../../hooks/useCategories";
import { Dashboard } from "./Dashboard";
import { IncomesCollection } from "/imports/api/incomes";
import { calculateTotalTransactionsAmount } from "/imports/utils/calculateTotalTransactionsAmount";
import { getTransactionsByMonth } from "/imports/utils/getTransactionsByMonth";

export type UserTotal = {
  name: string;
  picture: string;
  total: number;
  userId: UserId;
};

export function DashboardContainer(): JSX.Element {
  const categories = useCategories(
    { defaultUserId: { $ne: null }, type: "income" },
    {
      fields: {
        _id: 1,
        defaultUserId: 1,
        name: 1,
      },
    }
  );

  const { incomes, users } = useTracker(() => {
    const currentMonth = dayjs().endOf("month").endOf("day").toDate();
    const minimalDate = dayjs()
      .subtract(2, "month")
      .startOf("month")
      .startOf("day")
      .toDate();

    return {
      incomes: IncomesCollection.find(
        { date: { $gte: minimalDate, $lte: currentMonth } },
        { sort: { date: -1 } }
      ).fetch(),
      users: Meteor.users
        .find({}, { sort: { "profile.fname": 1, "profile.lname": 1 } })
        .fetch(),
    };
  }, []);

  const transactionsByMonth = getTransactionsByMonth(incomes);

  const deposits = Object.keys(transactionsByMonth).reduce<
    Array<{
      month: string;
      users: Array<UserTotal>;
    }>
  >((acc, month) => {
    const transactions = transactionsByMonth[month];

    const totalByUser = users.reduce<Array<UserTotal>>((accUser, user) => {
      const userCategory = categories.find(
        ({ defaultUserId }) => defaultUserId === user._id
      );

      if (!userCategory) {
        return accUser;
      }

      const userTransactions = transactions.filter(
        ({ categoryId }) => categoryId === userCategory._id
      );

      return [
        ...accUser,
        {
          name: `${user.profile.fname} ${user.profile.lname}`,
          picture: user.profile.picture,
          total: calculateTotalTransactionsAmount(userTransactions),
          userId: user._id as UserId,
        },
      ];
    }, []);

    return [...acc, { month, users: totalByUser }];
  }, []);

  return <Dashboard deposits={deposits} />;
}
