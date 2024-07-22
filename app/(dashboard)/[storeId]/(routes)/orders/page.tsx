import { getAllSales } from "@/actions/getSalesCount";
import { OrderColumn } from "@/components/Orders/Columns";
import Orders from "@/components/Orders/Orders";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await getAllSales(params.storeId);

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    address: item.address,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    amount: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    phone: item.phone,
    isPaid: item.isPaid,
  }));
  return (
    <>
      <Orders orders={formattedOrders} storeId={params.storeId} />
    </>
  );
};

export default OrdersPage;
