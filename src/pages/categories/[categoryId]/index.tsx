import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Loader, Tabs, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import AlertFetchError from "../../../components/AlertFetchError";
import MainLayout from "../../../components/MainLayout";
import { MenuButton } from "../../../components/MenuButton";
import PageHeader from "../../../components/PageHeader";
import Table from "../../../components/Table";
import useCategories from "../../../hooks/useCategories";
import notification from "../../../lib/notification";
import { ApiGetCategory } from "../../../server/categories";

export default function RootCategoryView() {
  return (
    <MainLayout>
      <CategoryView />
    </MainLayout>
  );
}

function CategoryView() {
  const router = useRouter();
  const { categoryId } = router.query;
  const [categories] = useCategories();

  const [tab, setTab] = useState<string | null>(null);

  const { data, error } = useSWR<ApiGetCategory>(
    () => categoryId && `/api/categories/${categoryId}`
  );
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (!data) return;
    if (data.Children.length > 0) setTab("subcategories");
    else setTab("transactions");
  }, [data]);

  if (error) return <AlertFetchError />;
  if (!data) return <Loader />;

  const backHref = (() => {
    if (data.Parent?.id) return `/categories/${data.Parent.id}`;
    return "/categories";
  })();

  const title = (() => {
    if (data.Parent?.id) return `${data.Parent.name} - ${data.name}`;
    return data.name;
  })();

  const handleClickDelete = () =>
    openConfirmModal({
      title: "Are you sure you want to delete this category?",
      children: <Text size="sm">This action cannot be undone.</Text>,
      confirmProps: { color: "red" },
      labels: { confirm: "Delete category", cancel: "Cancel" },
      onConfirm: async () => {
        try {
          await mutate(
            `/api/categories`,
            deleteCategory(categoryId as string),
            {
              populateCache: () => {
                return categories?.filter((category) => {
                  return category.id !== categoryId;
                });
              },
            }
          );

          notification("success");
          router.push("/categories");
        } catch (error) {
          console.error(error);
          notification("error");
        }
      },
    });

  return (
    <>
      <PageHeader backHref={backHref} title={title}>
        <MenuButton
          color="gray"
          mainButton={{
            label: "Edit",
            onClick: () => router.push(`/categories/${categoryId}/edit`),
          }}
          options={[
            { label: "Delete", icon: faTrash, onClick: handleClickDelete },
          ]}
        />
      </PageHeader>
      <Tabs keepMounted={false} onTabChange={setTab} value={tab}>
        <Tabs.List>
          {data.Children.length > 0 && (
            <Tabs.Tab value="subcategories">Subcategories</Tabs.Tab>
          )}
          <Tabs.Tab value="transactions">Transactions</Tabs.Tab>
          <Tabs.Tab value="report">Report</Tabs.Tab>
        </Tabs.List>

        {data.Children.length > 0 && (
          <Tabs.Panel value="subcategories" pt="xl">
            <Table>
              <Table.Body highlightOnHover={false}>
                {categories
                  ?.filter((category) => category.Parent?.id === categoryId)
                  .map((category) => (
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td>
                        <MenuButton
                          color="gray"
                          mainButton={{
                            label: "View",
                            onClick: () =>
                              router.push(`/categories/${category.id}`),
                          }}
                          options={[
                            {
                              icon: faPencil,
                              label: "Edit",
                              onClick: () =>
                                router.push(`/categories/${category.id}/edit`),
                            },
                            {
                              icon: faTrash,
                              label: "Delete",
                              onClick: handleClickDelete,
                            },
                          ]}
                          size="xs"
                        />
                      </td>
                    </tr>
                  ))}
              </Table.Body>
            </Table>
          </Tabs.Panel>
        )}
        <Tabs.Panel value="transactions" pt="xl">
          Coming soon
        </Tabs.Panel>
        <Tabs.Panel value="report" pt="xl">
          Coming soon
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

async function deleteCategory(categoryId: string) {
  const response = await fetch(`/api/categories/${categoryId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}
