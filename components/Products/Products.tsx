import { Separator } from "../ui/separator";
import { ProductColumn } from "./Columns";
import ProductsInfo from "./ProductsInfo";

export function Products({ products }: { products: ProductColumn[] }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="grid grid-cols-1 sm:gap-4 sm:py-4 sm:pl-14">
        <div className="p-7">
          <h1 className="font-bold text-4xl">Products</h1>
          <p className="text-lg text-gray-500">Overview of store products</p>
          <Separator className="mt-7" />
        </div>
        <ProductsInfo products={products} />
      </div>
    </div>
  );
}
