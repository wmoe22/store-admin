import Categories from "@/components/Categories/Categories";
import { CategoryColumn } from "@/components/Categories/Columns";
import db from "@/lib/db";
import { format } from "date-fns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <>
      <Categories categories={formattedCategories} />
    </>
  );
};

export default CategoriesPage;
