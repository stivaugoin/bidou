import { Loader } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import useCategories from "../hooks/useCategories";
import AlertFetchError from "./AlertFetchError";
import CategoriesRow from "./CategoriesRow";
import Table from "./Table";

export default function CategoriesList() {
  const [categories, loading, error] = useCategories();

  if (error) return <AlertFetchError />;
  if (loading) return <Loader />;

  const incomes = categories.filter(
    (category) => category.type === CategoryType.Income
  );
  const expenses = categories.filter(
    (category) => category.type === CategoryType.Expense && !category.Parent
  );

  return (
    <>
      <Table>
        <Table.Header>Incomes</Table.Header>
        <Table.Body>
          {incomes.map((category) => (
            <CategoriesRow category={category} key={category.id} />
          ))}
        </Table.Body>
      </Table>
      <Table>
        <Table.Header>Expenses</Table.Header>
        <Table.Body>
          {expenses.map((category) => (
            <CategoriesRow category={category} key={category.id} />
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
