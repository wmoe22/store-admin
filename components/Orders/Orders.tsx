import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import OrderCard from "../OrderCard/OrderCard";
import { Separator } from "../ui/separator";
import { OrderColumn } from "./Columns";
import OrderInfo from "./OrderInfo";

function Orders({ orders }: { orders: OrderColumn[] }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="grid grid-cols-1 sm:gap-4 sm:py-4 sm:pl-14">
        <div className="p-7">
          <h1 className="font-bold text-4xl">Orders</h1>
          <p className="text-lg text-gray-500">Overview of store orders</p>
          <Separator className="mt-7" />
        </div>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                <CardHeader>
                  <CardTitle>Your Orders</CardTitle>
                </CardHeader>
                <CardFooter className="max-w-lg text-balance text-muted-foreground leading-relaxed">
                  Introducing Our Dynamic Orders Dashboard for Seamless
                  Management and Insightful Analysis.
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>This Week</CardDescription>
                  <CardTitle className="text-4xl">$1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="text-4xl">$5,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +10% from last month
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div>
            <OrderInfo orders={orders} />
          </div>
          <div>
            <OrderCard />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Orders;
