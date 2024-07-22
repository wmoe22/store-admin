import CategoriesInfo from "@/components/Categories/CategoriesInfo";
import { CategoryColumn } from "./Columns";

const Categories = ({ categories }: { categories: CategoryColumn[] }) => {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-transparent">
        <div className="flex flex-col sm:gap-4 sm:py-3 sm:pl-16">
          <CategoriesInfo categories={categories} />
        </div>
      </div>
    </>
  );
};

export default Categories;
