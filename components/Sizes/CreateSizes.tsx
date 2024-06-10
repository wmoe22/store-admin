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
import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Badge } from "../ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface SizeFormProps {
  initialData: Size | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type SizeFormValues = z.infer<typeof formSchema>;
const CreateSizes = ({ initialData }: SizeFormProps) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toastMessage = initialData ? "Size updated" : "Size created";
  const button = initialData ? "Update Size" : "Create Size";

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const label = form.watch("name");
  const forValue = form.watch("value");

  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/sizes/`);
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
          <div className=" grid max-w-full flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <div>
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft
                    className="h-4 w-4"
                    onClick={() => router.push(`/${params.storeId}/sizes/`)}
                  />
                  <span className="sr-only">Back</span>
                </Button>
              </div>
              <h1 className="flex-1 shrink-0 gap-x-4 flex whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {label || "Size Name"}
                <Badge>{forValue || "size"}</Badge>
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button
                  size="sm"
                  disabled={loading}
                  type="submit"
                  form="size-form"
                >
                  {button}
                </Button>
              </div>
            </div>
            <Form {...form}>
              <form
                id="size-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>Size Creation</CardTitle>
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
                                      placeholder="Size name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-2">
                            <FormField
                              control={form.control}
                              name="value"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Value</FormLabel>
                                  <FormControl>
                                    <div className="flex items-center gap-x-4 ">
                                      <Input
                                        disabled={loading}
                                        placeholder="Size value"
                                        {...field}
                                      />
                                    </div>
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

export default CreateSizes;
