import { RefineDataTable } from "../RefineDataTable";
import ApiList from "../ui/api-list";
import { Separator } from "../ui/separator";
import { ProductColumn, columns } from "./Columns";

const ProductsInfo = ({ products }: { products: ProductColumn[] }) => {
  return (
    <main className="grid px-8 flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <RefineDataTable
        columns={columns}
        data={products}
        route="products"
        searchKey="name"
      />
      <Separator />
      <ApiList entityId="productId" entityName="products" />
    </main>
  );
};

export default ProductsInfo;
