import dayjs from "dayjs";
import React from "react";
import { useHistory } from "react-router-dom";
import { ExpenseId, IExpense } from "/imports/api/expenses";
import { getCategoryName } from "/imports/ui/utils/getCategoryName";

type Props = {
  onDelete: (expenseId: ExpenseId) => void;
  transactions: Array<IExpense>;
};

export function ExpensesList({ onDelete, transactions }: Props): JSX.Element {
  const history = useHistory();

  const renderAddButton = () => (
    <div className="flex space-x-4">
      <button onClick={() => history.push("/expenses/create")}>
        Create Expense
      </button>
    </div>
  );

  return (
    <div className="flex flex-col space-y-4">
      {transactions.length === 0 && (
        <div>
          <p>No transaction found</p>
          {renderAddButton()}
        </div>
      )}

      {transactions.length > 0 && (
        <>
          <div>{renderAddButton()}</div>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {transactions.map(({ _id, amount, categoryId, date }) => (
                <tr key={_id}>
                  <td>{dayjs(date).format("YYYY-MM-DD")}</td>
                  <td>{getCategoryName(categoryId)}</td>
                  <td>${(amount / 100).toFixed(2)}</td>
                  <td>
                    <button onClick={() => history.push(`/expenses/${_id}`)}>
                      Edit
                    </button>
                    <button onClick={() => onDelete(_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
