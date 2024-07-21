"use client";

import { RefineDataTable } from "../RefineDataTable";
import ApiList from "../ui/api-list";
import { Separator } from "../ui/separator";
import { CategoryColumn, columns } from "./Columns";

const CategoriesInfo = ({ categories }: { categories: CategoryColumn[] }) => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-4 sm:py-0 md:gap-8">
      <RefineDataTable
        route="categories"
        columns={columns}
        data={categories}
        searchKey="name"
      />
      <Separator />
      <ApiList entityId="categoryId" entityName="categories" />
    </main>
  );
};

export default CategoriesInfo;
