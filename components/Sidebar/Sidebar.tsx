"use client";

import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Store } from "@prisma/client";
import axios from "axios";
import {
  Grid2X2,
  Home,
  Layout,
  LineChart,
  Package,
  Palette,
  Percent,
  Ruler,
  Settings,
  ShoppingBag,
  Tag,
  User2,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "../ModeToggle";
import StoreModal from "../StoreModal";
import { Separator } from "../ui/separator";
import { Tooltip } from "../ui/tooltip";

interface SidebarProps {
  currentUser?: Store | null;
}

const Sidebar = ({ currentUser }: SidebarProps) => {
  const pathname = usePathname();
  const { storeId } = useParams();

  const navLinks = [
    { name: "Dashboard", path: `/${storeId}`, icon: Home },
    { name: "Billboard", path: `/${storeId}/billboards`, icon: Layout },
    { name: "Orders", path: `/${storeId}/orders`, icon: ShoppingBag },
    { name: "Categories", path: `/${storeId}/categories`, icon: Grid2X2 },
    { name: "Colors", path: `/${storeId}/colors`, icon: Palette },
    { name: "Sizes", path: `/${storeId}/sizes`, icon: Ruler },
    { name: "Brand", path: `/${storeId}/brands`, icon: Tag },
    { name: "Products", path: `/${storeId}/products`, icon: Package },
    { name: "Discount", path: `/${storeId}/discounts`, icon: Percent },
    { name: "Customers", path: `/${storeId}/customers`, icon: User2 },
    { name: "Analytics", path: `/${storeId}/analytics`, icon: LineChart },
  ];

  const [stores, setStores] = useState<Store[]>([]);

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
    fetchStores();
  }, []);

  return (
    <aside className="fixed overflow-auto inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-5 ">
        {navLinks.map(({ name, path, icon: Icon }) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              <Link
                href={path}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  pathname === path
                    ? "bg-blue-100 dark:bg-accent rounded-lg p-1 dark:text-white"
                    : "hover:bg-accent hover:rounded-lg dark:hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{name}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{name}</TooltipContent>
          </Tooltip>
        ))}
        <ModeToggle />
        <StoreModal />
        <Separator />
      </nav>
      <nav className="flex flex-col items-center mt-auto px-2 py-3 mb-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/${storeId}/settings`}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground md:h-8 md:w-8",
                pathname === `/${storeId}/settings`
                  ? "bg-accent rounded-lg dark:text-white"
                  : "hover:bg-accent hover:rounded-lg dark:hover:text-white"
              )}
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default Sidebar;
