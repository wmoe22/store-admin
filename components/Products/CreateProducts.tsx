"use client";

import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Category,
  Color,
  Image as Images,
  Product,
  Size,
} from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import ImageUpload from "../ImageUpload";
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

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Images[];
      })
    | null;
  categories: Category[];
  colors: Color[];
  sizes: Size[];
}

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});
type ProductFormValues = z.infer<typeof formSchema>;

const CreateProducts = ({
  initialData,
  categories,
  colors,
  sizes,
}: ProductFormProps) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price)),
        }
      : {
          name: "",
          images: [],
          price: 0,
          categoryId: "",
          colorId: "",
          sizeId: "",
          isFeatured: false,
          isArchived: false,
        },
  });

  const toastMessage = initialData ? "Product updated" : "Product created";
  const button = initialData ? "Update product" : "Create product";

  const label = form.watch("name");

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/products/`);
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
          <div className="grid  flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {label || "Product Name"}
              </h1>

              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button
                  size="sm"
                  disabled={loading}
                  form="product-form"
                  type="submit"
                >
                  {button}
                </Button>
              </div>
            </div>
            <Form {...form}>
              <form
                id="product-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      disabled={loading}
                                      placeholder="Product Name"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                              control={form.control}
                              name="name"
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Price</FormLabel>
                                  <FormControl>
                                    <Input
                                      disabled={loading}
                                      placeholder="Product Price"
                                      {...field}
                                      type="number"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                              control={form.control}
                              name="price"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card x-chunk="dashboard-07-chunk-2">
                      <CardHeader>
                        <CardTitle>Categories</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 sm:grid-cols-3">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="categoryId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Category</FormLabel>
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
                                          placeholder="Select a category"
                                        />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {categories.map((category) => (
                                        <SelectItem
                                          key={category.id}
                                          value={category.id}
                                        >
                                          {category.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="colorId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Color</FormLabel>
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
                                          placeholder="Select a color"
                                        />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {colors.map((color) => (
                                        <SelectItem
                                          key={color.id}
                                          value={color.id}
                                        >
                                          {color.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="sizeId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Size</FormLabel>
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
                                          placeholder="Select a size"
                                        />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {sizes.map((size) => (
                                        <SelectItem
                                          key={size.id}
                                          value={size.id}
                                        >
                                          {size.name}
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
                  <div className="grid">
                    <Card x-chunk="dashboard-07-chunk-2">
                      <CardHeader>
                        <CardTitle>Controls</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-x-4 ">
                          <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    Featured
                                    <FormDescription>
                                      This product will appear on the home page
                                    </FormDescription>
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="isArchived"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    isArchived
                                    <FormDescription>
                                      This product will not appear anywhere
                                    </FormDescription>
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card
                      className="overflow-hidden"
                      x-chunk="dashboard-07-chunk-4"
                    >
                      <CardHeader>
                        <CardTitle>Product Images</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                  <ImageUpload
                                    value={field.value.map(
                                      (image) => image.url
                                    )}
                                    disabled={loading}
                                    onChange={(url) =>
                                      field.onChange([...field.value, { url }])
                                    }
                                    className="w-[400px] h-[400px]"
                                    onRemove={(url) =>
                                      field.onChange([
                                        ...field.value.filter(
                                          (current) => current.url !== url
                                        ),
                                      ])
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
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

export default CreateProducts;
