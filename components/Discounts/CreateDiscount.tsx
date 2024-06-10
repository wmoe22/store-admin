"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Discount, Product } from "@prisma/client";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DiscountProps {
  initialData: Discount | null;
  products: Product[];
}

const formSchema = z.object({
  name: z.string().min(1),
  percentage: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(0).max(100)
  ),
  isArchived: z.boolean().default(false).optional(),
  productId: z.string().min(1),
  startDate: z.date({ required_error: "A date is required!" }),
  endDate: z.date({ required_error: "A date is required!" }),
});

type DiscountFormValues = z.infer<typeof formSchema>;

const CreateDiscounts = ({ initialData, products }: DiscountProps) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);

  const initialValues = initialData
    ? {
        ...initialData,
        startDate: parseISO(format(initialData.startDate, "yyyy-MM-dd")),
        endDate: parseISO(format(initialData.endDate, "yyyy-MM-dd")),
      }
    : {
        name: "",
        percentage: 0,
        productId: "",
        startDate: new Date(),
        endDate: new Date(),
      };

  const toastMessage = initialData ? "Discount updated" : "Discount created";
  const button = initialData ? "Update Discount" : "Create Discount";

  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const label = form.watch("name");

  const onSubmit = async (data: DiscountFormValues) => {
    console.log("Submitting form...", data);
    try {
      setLoading(true);
      if (initialData) {
        console.log("hello");
        await axios.patch(
          `/api/${params.storeId}/discounts/${params.discountId}`,
          data
        );
      } else {
        console.log("hi");
        await axios.post(`/api/${params.storeId}/discounts`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/discounts/`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => router.push(`/${params.storeId}/discounts/`)}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {label || "Discount Coupon Code"}
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button
                  disabled={loading}
                  form="discount-form"
                  size="sm"
                  type="submit"
                >
                  {button}
                </Button>
              </div>
            </div>
            <Form {...form}>
              <form
                id="discount-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>Discount Details</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      disabled={loading}
                                      placeholder="Discount name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="percentage"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Percentage</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      disabled={loading}
                                      placeholder="0.2"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-2">
                      <CardHeader>
                        <CardTitle>Products</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 sm:grid-cols-3">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="productId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Product</FormLabel>
                                  <Select
                                    disabled={loading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue
                                          defaultValue={field.value}
                                          placeholder="Select a product"
                                        />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {products.map((product) => (
                                        <SelectItem
                                          key={product.id}
                                          value={product.id}
                                        >
                                          {product.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-3">
                      <CardHeader>
                        <CardTitle>Start Date</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="startDate"
                              render={({ field }) => (
                                <FormItem>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-[240px] pl-3 text-left font-normal",
                                            !field.value &&
                                              "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date < new Date() ||
                                          date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-3">
                      <CardHeader>
                        <CardTitle>Archived</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <FormField
                          control={form.control}
                          name="isArchived"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  <FormDescription>
                                    This discount will not be active (In default
                                    it is false when you create)
                                  </FormDescription>
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    <Card x-chunk="dashboard-07-chunk-3">
                      <CardHeader>
                        <CardTitle>End Date</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="endDate"
                              render={({ field }) => (
                                <FormItem>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-[240px] pl-3 text-left font-normal",
                                            !field.value &&
                                              "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date < new Date() ||
                                          date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                  <Button size="sm" type="submit" disabled={loading}>
                    {button}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateDiscounts;
