"use client";

import { RefineDataTable } from "../RefineDataTable";
import { OrderColumn, columns } from "./Columns";

const OrderInfo = ({ orders }: { orders: OrderColumn[] }) => {
  return (
    <div>
      {/* TODO:week/month/year */}
      <RefineDataTable
        columns={columns}
        data={orders}
        searchKey={"products"}
        route={"orders"}
      />
    </div>
  );
};

export default OrderInfo;
