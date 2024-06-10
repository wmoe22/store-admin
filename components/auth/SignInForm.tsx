"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { SignInSchema } from "@/schema";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { Arima } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const font = Arima({ subsets: ["latin"] });
export function SignInForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/",
    });
  };

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    setLoading(true);
    try {
      await signIn("credentials", {
        ...values,
        redirect: false,
      }).then((callback) => {
        setLoading(false);
        if (callback?.ok) {
          toast.success("Logged in");
          router.push("/");
          router.refresh();
        }
      });
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12 bg-white">
        <div className="mx-auto grid w-[350px] gap-3 ">
          <div className="grid gap-2 text-center ">
            <h1 className=" font-bold text-3xl text-[#333333]">Login Form</h1>
            <p className="text-muted-foreground text-base">Welcome Back</p>
          </div>
          <Form {...form}>
            <form
              action=""
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={loading}
                            placeholder="john.doe@example.com"
                            type="email"
                            className="border border-[#cccccc] "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={loading}
                            placeholder="*****"
                            type="password"
                            className="border border-[#cccccc] "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-900 hover:bg-gray-700  text-white"
                >
                  Login
                </Button>
              </div>
            </form>
          </Form>
          <Button
            className="w-full flex  gap-x-2 items-center"
            variant={"outline"}
            onClick={() => onClick("google")}
          >
            Login with Google
            <FcGoogle size={20} />
          </Button>
          <Button
            variant={"outline"}
            className="w-full flex  gap-x-2 items-center"
            onClick={() => onClick("github")}
          >
            Login with Github
            <Github size={20} />
          </Button>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden relative bg-muted lg:block">
        <p
          className={cn(
            "absolute  text-3xl   right-10 top-10 text-blue-400 capitalize",
            font.className
          )}
        ></p>
        <Image
          src="/c1.jpg"
          alt="Image"
          fill
          className="h-full w-full object-cover object-center "
        />
      </div>
    </div>
  );
}
