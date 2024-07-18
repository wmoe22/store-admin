import { useStoreModal } from "@/hooks/use-store-modal";
import { cn } from "@/lib/utils";
import { Store } from "@prisma/client";
import {
  ArrowUpDown,
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  stores: Store[];
}

const StoreSwitcher = ({ className, stores = [] }: StoreSwitcherProps) => {
  const params = useParams();
  const router = useRouter();
  const storeModal = useStoreModal();

  const isTabletOrMobile = useMediaQuery({
    query: "(max-width: 1224px)",
  });

  const [open, setOpen] = useState(false);

  const formattedStores = stores.map((store) => ({
    label: store.name,
    value: store.id,
  }));

  console.log(formattedStores);

  const currentStore = formattedStores.find(
    (store) => store.value === params.storeId
  );
  console.log(currentStore, "currentStore");

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="flex p-0 gap-y-2 bg-transparent flex-row gap-x-4 px-4 py-2 "
      >
        <Button
          size={"sm"}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn(" h-fit  w-full")}
        >
          <StoreIcon className="h-45 w-45" />{" "}
          <p className={className}> {currentStore?.label}</p>
          {isTabletOrMobile ? (
            <ArrowUpDown className="w-4 h-4 shrink-0" />
          ) : (
            <ChevronsUpDown className=" w-4 h-4 shrink-0" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-[200px]  p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedStores.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon className="h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
