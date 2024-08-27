import CreateCategories from "@/components/Categories/CreateCategories";
import db from "@/lib/db";

const CategoryPage = async ({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) => {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <>
      <CreateCategories initialData={category} billboards={billboards} />
    </>
  );
};

export default CategoryPage;
