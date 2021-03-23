import classNames from "classnames";
import dayjs from "dayjs";
import React from "react";
import { Page } from "../../components/Page";
import { UserTotal } from "./DashboardContainer";
import { formatAmount } from "/imports/utils/formatAmount";

type DepositMonthProps = {
  month: string;
  users: Array<UserTotal>;
};

function Month({ month, users }: DepositMonthProps) {
  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-500">
        {dayjs(month).format("YYYY - MMMM")}
      </div>

      <div
        className={classNames(
          "bg-white rounded-lg shadow grid grid-cols-1 gap-4 p-4"
        )}
      >
        {users.map((user) => (
          <div className="flex items-center justify-between" key={user.userId}>
            <div className="flex items-center space-x-4 text-sm sm:text-base font-medium text-gray-500 truncate">
              <img className="h-8 w-8 rounded-full" src={user.picture} />
              <span>{user.name}</span>
            </div>
            <div className="text-base md:text-lg font-medium text-gray-900">
              {formatAmount(user.total)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type Props = { deposits: Array<DepositMonthProps> };

export function Dashboard({ deposits }: Props): JSX.Element {
  return (
    <Page header={{ title: "Dashboard" }}>
      <div className="space-y-4 px-4 md:px-0">
        <h2 className="text-lg border-b pb-2 leading-6 font-medium text-gray-900">
          Deposits - Last 3 months
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {deposits.map(({ month, users }) => (
            <Month key={month} month={month} users={users} />
          ))}
        </div>
      </div>
    </Page>
  );
}
