type Props = {
  params: {
    categoryId: string;
  };
};

export default function CategoriesCategoryIdPage({ params }: Props) {
  return (
    <div>
      <h1>Category</h1>
      <p>Category ID: {params.categoryId}</p>
    </div>
  );
}
