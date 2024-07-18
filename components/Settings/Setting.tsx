"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import ImageUpload from "../ImageUpload";
import AlertModal from "../ui/alert-modal";
import { ApiAlert } from "../ui/api-alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import useGetOrigin from "../ui/get-origin";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
  logoUrl: z.string().optional(),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export function Settings({ initialData }: SettingsFormProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  const defaultValues: SettingsFormValues = {
    name: initialData.name,
    logoUrl: initialData.logoUrl ?? undefined,
  };

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success("Store updated!");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Store Deleted!");
    } catch (error) {
      toast.error("Make sure you removed all products and categories first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex min-h-screen flex-1 flex-col gap-4 bg-transparent p-4 md:gap-8 md:p-10">
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-1 lg:grid-cols-1">
            <div className="grid gap-6">
              <Card x-chunk="dashboard-04-chunk-1">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full"
                  >
                    <CardHeader>
                      <CardTitle>Store Name</CardTitle>
                      <CardDescription>
                        Used to identify your store in the marketplace.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-8">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  disabled={loading}
                                  placeholder="Store Name"
                                  {...field}
                                  className="w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="logoUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <ImageUpload
                                  value={field.value ? [field.value] : []}
                                  disabled={loading}
                                  className="w-[100px] h-[100px]"
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
                    <CardFooter className="border-t px-6 py-4">
                      <Button disabled={loading} type="submit">
                        Save Changes
                      </Button>{" "}
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </div>
            <Button
              variant={"destructive"}
              className="flex items-center w-fit gap-x-2"
              onClick={() => setOpen(true)}
            >
              Delete Store
              <Trash className="w-4 h-4" />
            </Button>
            <Separator />
            <ApiAlert
              title={"NEXT_PUBLIC_API_URL"}
              variant="public"
              description={`${useGetOrigin()}/api/${params.storeId}`}
            />
          </div>
        </main>
      </div>
    </>
  );
}
