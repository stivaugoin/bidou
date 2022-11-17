import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Loader, Tabs, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import AlertFetchError from "../../../components/AlertFetchError";
import CategoryTransactions from "../../../components/CategoryTransactions";
import MainLayout from "../../../components/MainLayout";
import { MenuButton } from "../../../components/MenuButton";
import PageHeader from "../../../components/PageHeader";
import Subcategories from "../../../components/Subcategories";
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
  const categoryId = router.query.categoryId as string;

  const [tab, setTab] = useState<string | null>(null);

  const { data, error } = useSWR<ApiGetCategory>(
    () => categoryId && `/api/categories/${categoryId}`
  );

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
          await deleteCategory(categoryId);
          notification("success");
          router.push(backHref);
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
            <Subcategories categoryId={categoryId as string} />
          </Tabs.Panel>
        )}
        <Tabs.Panel value="transactions" pt="xl">
          <CategoryTransactions />
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
