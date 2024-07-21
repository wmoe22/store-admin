import { ProductColumn } from "./Columns";
import ProductsInfo from "./ProductsInfo";

export function Products({ products }: { products: ProductColumn[] }) {
  return (
    <div className="flex bg-transparent min-h-screen px-12 w-full flex-col ">
      <div className="grid  grid-cols-1  sm:gap-4 sm:py-3 sm:pl-2">
        <ProductsInfo products={products} />
      </div>
    </div>
  );
}
