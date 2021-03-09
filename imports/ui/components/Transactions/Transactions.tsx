import dayjs from "dayjs";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getCategoryName } from "../../utils/getCategoryName";
import { IconArrowRight } from "../Icons/ArrowRight";
import { IExpense } from "/imports/api/expenses";
import { IIncome } from "/imports/api/incomes";
import { calcultateTotalTransactionsAmount } from "/imports/utils/calculateTotalTransactionsAmount";
import { formatAmount } from "/imports/utils/formatAmount";
import { getTransactionsByMonth } from "/imports/utils/getTransactionsByMonth";

type Transactions = Array<IIncome | IExpense>;

type TransactionsProps = {
  transactions: Transactions;
};

export function Transactions({ transactions }: TransactionsProps): JSX.Element {
  const { pathname } = useLocation();

  const transactionsByMonth = getTransactionsByMonth(transactions);

  return (
    <>
      {Object.keys(transactionsByMonth).map((month) => (
        <div key={month} className="shadow md:rounded-lg md:overflow-hidden">
          <div className="flex justify-between px-4 py-2 text-md bg-gray-50 border-b border-gray-200">
            <span className="text-gray-900">
              {dayjs(month).format("YYYY - MMMM")}
            </span>
            <span className="font-medium text-gray-900">
              {formatAmount(
                calcultateTotalTransactionsAmount(transactionsByMonth[month])
              )}
            </span>
          </div>
          <ul className="divide-y divide-gray-200 overflow-hidden">
            {transactionsByMonth[month].map((transaction) => (
              <li key={transaction._id}>
                <Link
                  to={`${pathname}/${transaction._id}`}
                  className="block px-4 py-4 bg-white hover:bg-gray-50"
                >
                  {/* Mobile */}
                  <span className="flex md:hidden items-center space-x-4">
                    <span className="flex-1 flex space-x-2 truncate">
                      <span className="flex flex-col text-gray-500 text-md truncate">
                        <span className="truncate font-medium">
                          {getCategoryName(transaction.categoryId)}
                        </span>
                        <span className="text-gray-900 font-medium">
                          {formatAmount(transaction.amount)}
                        </span>
                        <span>
                          {dayjs(transaction.date).format("MMMM, DD YYYY")}
                        </span>
                      </span>
                    </span>
                    <IconArrowRight className="flex-shrink-0 h-5 w-5 text-gray-400" />
                  </span>

                  {/* Desktop */}
                  <span className="hidden md:flex justify-center items-center space-x-4">
                    <span className="flex-1 grid grid-cols-4">
                      <span className="truncate font-medium col-span-2">
                        {getCategoryName(transaction.categoryId)}
                      </span>
                      <span>
                        {dayjs(transaction.date).format("MMMM, DD YYYY")}
                      </span>
                      <span className="text-gray-900 font-medium text-right">
                        {formatAmount(transaction.amount)}
                      </span>
                    </span>
                    <IconArrowRight className="flex-shrink-0 h-5 w-5 text-gray-400" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
