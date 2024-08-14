"use client";

import { getStockCount } from "@/actions/getStockCount";
import { UserButton } from "@clerk/nextjs";
import { Store } from "@prisma/client";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import StoreSwitcher from "./StoreSwitcher";
import { Separator } from "./ui/separator";

const Navbar = ({ storeId }: { storeId: string }) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [stocks, setStocks] = useState<number[]>([]);
  const pathname = usePathname();

  const pathSegments = pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("/api/getStores");

        if (response.status !== 200) throw new Error("Failed to fetch stores");
        setStores(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchStocks = async () => {
      try {
        const response = await getStockCount(storeId);
        if (response.status !== 200)
          throw new Error("Failed to fetch stock count");
        setStocks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStores();
    fetchStocks();
  }, [storeId]); // Added storeId to dependency array

  return (
    <>
      <div className="px-10 py-4 flex justify-between">
        <div className="flex flex-col pl-14">
          <h1 className="font-bold text-4xl capitalize">
            {storeId !== lastSegment ? lastSegment : "Dashboard"}
          </h1>
          <p className="text-base text-muted-foreground">
            Overview of the {storeId !== lastSegment ? lastSegment : "store"}
          </p>
        </div>
        <div className="flex gap-x-4 items-center">
          <StoreSwitcher stores={stores} />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Navbar;
