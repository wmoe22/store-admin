import { CustomerColumn } from "@/components/Customers/Columns";
import Customers from "@/components/Customers/Customers";
import db from "@/lib/db";
import { format } from "date-fns";

const CustomersPage = async ({ params }: { params: { storeId: string } }) => {
  const customers = await db.customer.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCustomers: CustomerColumn[] = customers.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    address: item.address || "",
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return <Customers customers={formattedCustomers} />;
};

export default CustomersPage;
