import { Loader } from "@mantine/core";
import { CategoryType } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { z } from "zod";
import AlertFetchError from "../../components/AlertFetchError";
import FormUpdateCategory from "../../components/FormUpdateCategory";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";
import PageOptions from "../../components/PageOptions";
import useCategories from "../../hooks/useCategories";
import notification from "../../lib/notification";
import { ApiGetCategory } from "../../server/categories";

const schema = z.object({
  name: z.string().min(1),
  type: z.nativeEnum(CategoryType),
  parentId: z.string().optional().nullable(),
});

const OPTIONS = [
  { value: CategoryType.Expense, label: "Expense" },
  { value: CategoryType.Income, label: "Income" },
];

export default function CategoryView() {
  const router = useRouter();
  const { categoryId } = router.query;
  const [categories] = useCategories();

  const { data, error } = useSWR<ApiGetCategory>(
    () => categoryId && `/api/categories/${categoryId}`
  );
  const { mutate } = useSWRConfig();

  const handleDelete = async () => {
    try {
      await mutate(`/api/categories`, deleteCategory(categoryId as string), {
        populateCache: () => {
          return categories?.filter((category) => {
            return category.id !== categoryId;
          });
        },
      });

      notification("success");
      router.push("/categories");
    } catch (error) {
      console.error(error);
      notification("error");
    }
  };

  return (
    <MainLayout>
      <PageHeader backHref="/categories" title="Edit category">
        <PageOptions onConfirmDelete={handleDelete} />
      </PageHeader>

      {error && <AlertFetchError />}
      {!error && !data && <Loader />}
      {!error && data && <FormUpdateCategory category={data} />}
    </MainLayout>
  );
}

async function deleteCategory(categoryId: string) {
  const response = await fetch(`/api/categories/${categoryId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}
