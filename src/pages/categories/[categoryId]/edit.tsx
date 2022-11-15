import { Loader } from "@mantine/core";
import { useRouter } from "next/router";
import useSWR from "swr";
import AlertFetchError from "../../../components/AlertFetchError";
import FormUpdateCategory from "../../../components/FormUpdateCategory";
import MainLayout from "../../../components/MainLayout";
import PageHeader from "../../../components/PageHeader";
import { ApiGetCategory } from "../../../server/categories";

export default function CategoryView() {
  const router = useRouter();
  const { categoryId } = router.query;

  const { data, error } = useSWR<ApiGetCategory>(
    () => categoryId && `/api/categories/${categoryId}`
  );

  return (
    <MainLayout>
      <PageHeader backHref="/categories" title="Edit category" />

      {error && <AlertFetchError />}
      {!error && !data && <Loader />}
      {!error && data && <FormUpdateCategory category={data} />}
    </MainLayout>
  );
}
