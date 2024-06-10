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
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import ImageUpload from "../ImageUpload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface BillboardProps {
  initialData: Billboard | null;
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;

const CreateBillboards = ({ initialData }: BillboardProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const toastMessage = initialData ? "Billboard updated" : "Billboard created";
  const button = initialData ? "Update Billboard" : "Create Billboard";

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const label = form.watch("label");

  const onSubmit = async (data: BillboardFormValues) => {
    setLoading(true);
    try {
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/billboards/`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    router.push(`/${params.storeId}/billboards/`);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <div>
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" onClick={handleBackClick} />
                  <span className="sr-only">Back</span>
                </Button>
              </div>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {label || "Billboard Label"}
              </h1>
              <div className="hidden items-center  md:ml-auto md:flex">
                <Button
                  size="sm"
                  disabled={loading}
                  type="submit"
                  form="billboard-form"
                >
                  {button}
                </Button>
              </div>
            </div>
            <Form {...form}>
              <form
                id="billboard-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
                <div className="grid gap-4 md:grid-cols-[1fr_300px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Billboard Creation</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="label"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Label</FormLabel>
                                  <FormControl>
                                    <Input
                                      disabled={loading}
                                      placeholder="Billboard label"
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
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card className="overflow-hidden">
                      <CardHeader>
                        <CardTitle>Billboard Images</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <ImageUpload
                                    value={field.value ? [field.value] : []}
                                    disabled={loading}
                                    className="w-[400px] h-[400px]"
                                    onChange={(url) => field.onChange(url)}
                                    onRemove={() => field.onChange("")}
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
                  <Button size="sm" disabled={loading} type="submit">
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

export default CreateBillboards;
