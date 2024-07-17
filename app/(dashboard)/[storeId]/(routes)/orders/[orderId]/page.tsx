import getOrderDetails from "@/actions/getEachOrder";
import OrderDetailCard from "@/components/OrderDetailCard";
import { RefineDataTable } from "@/components/RefineDataTable";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { columns } from "./columns";

interface OrderDetailsProps {
  params: { orderId: string };
  storeId: string;
}

const OrderDetails = async ({ params, storeId }: OrderDetailsProps) => {
  const orderItems = (
    await getOrderDetails({ storeId, orderId: params.orderId })
  ).map((item) => item.orderItems);

  const details = await getOrderDetails({
    storeId,
    orderId: params.orderId,
  });

  const products = orderItems[0].map((item) => item.product);
  const amount = formatter.format(
    orderItems[0].reduce((total, item) => {
      return total + Number(item.product.price);
    }, 0)
  );

  const formattedOrder = details.map((item) => ({
    products: item.orderItems.map((item) => item.product.name),
    isPaid: item.isPaid,
    price: item.orderItems.map((item) =>
      formatter.format(Number(item.product.price))
    ),
    grandTotal: amount,
  }));

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="p-7">
          <h1 className="font-bold text-4xl">Order Details</h1>
          <p className="text-lg text-gray-500">Detail review of orders</p>
          <Separator className="mt-7" />
        </div>
        <div className="grid grid-cols-2 px-7">
          <OrderDetailCard
            orderId={params.orderId}
            data={details}
            orderItems={orderItems[0]}
            products={products}
            amount={amount}
          />
          <RefineDataTable
            columns={columns}
            data={formattedOrder}
            searchKey={"id"}
            route={"orders"}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
