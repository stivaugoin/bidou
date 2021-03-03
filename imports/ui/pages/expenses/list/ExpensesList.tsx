import dayjs from "dayjs";
import React from "react";
import { useHistory } from "react-router-dom";
import { ExpenseId, IExpense } from "/imports/api/expenses";
import { Button } from "/imports/ui/components/Button/Button";
import { getCategoryName } from "/imports/ui/utils/getCategoryName";

type Props = {
  onDelete: (expenseId: ExpenseId) => void;
  transactions: Array<IExpense>;
};

export function ExpensesList({ onDelete, transactions }: Props): JSX.Element {
  const history = useHistory();

  const renderAddButton = () => (
    <div className="flex space-x-4">
      <Button
        onClick={() => history.push("/expenses/create")}
        variant="primary"
      >
        Create Expense
      </Button>
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
                    <Button
                      onClick={() => history.push(`/expenses/${_id}`)}
                      variant="secondary"
                    >
                      Edit
                    </Button>
                    <Button onClick={() => onDelete(_id)} variant="secondary">
                      Delete
                    </Button>
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
