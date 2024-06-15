"use client";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Store } from "@prisma/client";
import axios from "axios";
import {
  Grid2X2,
  Home,
  Layout,
  LayoutGrid,
  LineChart,
  Package,
  Palette,
  Percent,
  Ruler,
  ShoppingBag,
  Tag,
  User2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";
import StoreSwitcher from "./StoreSwitcher";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface MobileMenuProps {
  currentUser?: Store | null;
}

const MobileMenu = ({ currentUser }: MobileMenuProps) => {
  const [isExpended, setIsExpended] = useState(false);
  const { storeId } = useParams();

  const navLinks = [
    { name: "Dashboard", path: `/${storeId}`, icon: Home },
    { name: "Billboard", path: `/${storeId}/billboards`, icon: Layout },
    { name: "Orders", path: `/${storeId}/orders`, icon: ShoppingBag },
    { name: "Products", path: `/${storeId}/products`, icon: Package },
    { name: "Categories", path: `/${storeId}/categories`, icon: Grid2X2 },
    { name: "Colors", path: `/${storeId}/colors`, icon: Palette },
    { name: "Sizes", path: `/${storeId}/sizes`, icon: Ruler },
    { name: "Brand", path: `/${storeId}/brands`, icon: Tag },
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
        setStores(response.data.stores);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStores();
  }, []);

  return (
    <nav>
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex w-fit fixed right-2 p-4">
            <Button
              className={cn(
                "xl:hidden  hover:bg-gray-300 dark:bg-gray-500 transition-all px-3 bg-gray-200 rounded-full"
              )}
              onClick={() => setIsExpended(!isExpended)}
              variant="ghost"
            >
              <LayoutGrid className="h-5 w-5" />
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent>
          <div className="flex items-center justify-start px-3.5">
            <UserButton afterSignOutUrl="/sign-in" />
            <ModeToggle />
          </div>
          <ul onClick={() => setIsExpended(!isExpended)}>
            {navLinks.map(({ name, path, icon: Icon }) => (
              <li key={name} className="flex group">
                <Link
                  href={path}
                  className="flex gap-x-2 p-4  items-center justify-center"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-center">{name}</span>
                </Link>
              </li>
            ))}
            <div className="flex items-center flex-col">
              <StoreSwitcher stores={stores} />
            </div>
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileMenu;
