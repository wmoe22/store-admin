import { formatter } from "@/lib/utils";
import { Order, OrderItem, Product } from "@prisma/client";
import { format } from "date-fns";
import { CreditCard } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

const OrderDetailCard = ({
  orderId,
  data,
  orderItems,
  products,
  amount,
}: {
  orderId: string;
  data: Order[];
  orderItems: OrderItem[];
  products: Product[];
  amount: string;
}) => {
  return (
    <Card className="rounded-xl">
      <CardHeader className="bg-[#18181a] rounded-t-xl">
        <h1 className="text-xl">Order {orderId}</h1>
        <p className="text-muted-foreground">
          Date: {format(data[0].createdAt, "MMMM do, yyyy")}
        </p>
      </CardHeader>
      <CardContent className="pb-4 px-6">
        <div className="pt-6 flex flex-col gap-3">
          <h1>Order Details</h1>
          {products.map((item) => (
            <div key={item.id} className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">{item.name}</p>
                <p>{formatter.format(Number(item.price))}</p>
              </div>
            </div>
          ))}
          <hr />
          <div className="flex justify-between items-center">
            <h1 className="text-muted-foreground">Total</h1>
            <p>{amount}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <div>
              <h1>Shipping Information</h1>
              <p className="text-muted-foreground text-left">
                {data[0].address}
              </p>
            </div>
            <div>
              <h1>Billing Information</h1>
              <p className="text-muted-foreground text-right">
                {data[0].address}
              </p>
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-3">
            <h1>Customer Information</h1>
            <div className="flex justify-between">
              <p className="text-muted-foreground">Customer</p>
              <p>{data[0].customerName}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-muted-foreground">Email</p>
              <p>{data[0].email}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-muted-foreground">Phone</p>
              <p>{data[0].phone}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-[#18181a] rounded-b-xl py-6  gap-3 flex flex-col items-start">
        <h1>Payment Information</h1>
        <div className="flex justify-between w-full">
          <p className="text-muted-foreground">online</p>
          <div className="flex items-center gap-x-1">
            <CreditCard className="w-4 h-4 text-muted-foreground" />
            <p>{data[0].paymentInfo}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderDetailCard;
