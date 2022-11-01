import FormCreateCategory from "../../components/FormCreateCategory";
import MainLayout from "../../components/MainLayout";
import PageHeader from "../../components/PageHeader";

export default function CategoriesCreate() {
  return (
    <MainLayout>
      <PageHeader backHref="/categories" title="Create category" />
      <FormCreateCategory />
    </MainLayout>
  );
}
