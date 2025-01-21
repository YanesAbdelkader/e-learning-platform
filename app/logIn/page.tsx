"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Divider } from "@/components/divider";
import { Github, Facebook, Instagram, Loader2, Chrome } from "lucide-react";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { setCookie } from "typescript-cookie";
import { useRouter } from "next/navigation";
import { handleAPIcall } from "@/functions/custom";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginData) {
    setIsLoading(true);
    try {
      const { data: response, error } = await handleAPIcall(
        data,
        "",
        "login",
        "POST"
      );

      if (error) {
        setError(error.message || "Login failed");
      } else if (response.status == 200) {
        setCookie("token", response.data.token, { expires: 15 });
        router.push("/");
      } else if (response.status == 201) {
        console.log(response.data.message);
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      setError("Something went wrong. Please try again.");
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);

    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/redirect/${provider}/web`,
      "",
      "popup=true"
    );
    console.log(`Logging in with ${provider}`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-prose space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Log in to your account
          </h2>
        </div>
        {error && (
          <div
            onClick={() => setError("")}
            className="text-center p-3.5 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {error}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
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
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Log In
            </Button>
          </form>
        </Form>

        <Divider>Or continue with</Divider>

        <div className="mt-6 grid grid-cols-4 gap-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                variant="outline"
                className="dark:border-2"
                onClick={() => handleSocialLogin("facebook")}
                disabled={isLoading}
              >
                <Facebook className="h-8 w-8" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    Sign in with Facebook
                  </h4>
                  <p className="text-sm">
                    Use your Facebook account for a quick and easy login
                    process.
                  </p>
                  <div className="flex items-center pt-2">
                    <span className="text-xs text-muted-foreground">
                      Powered by Facebook
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                variant="outline"
                className="dark:border-2"
                onClick={() => handleSocialLogin("instagram")}
                disabled={isLoading}
              >
                <Instagram className="h-8 w-8" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    Sign in with Instagram
                  </h4>
                  <p className="text-sm">
                    Connect your Instagram account for a seamless login
                    experience.
                  </p>
                  <div className="flex items-center pt-2">
                    <span className="text-xs text-muted-foreground">
                      Powered by Instagram
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                variant="outline"
                className="dark:border-2"
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading}
              >
                <Chrome className="h-8 w-8" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Sign in with Google</h4>
                  <p className="text-sm">
                    Use your Google account to quickly and securely sign in to
                    our platform.
                  </p>
                  <div className="flex items-center pt-2">
                    <span className="text-xs text-muted-foreground">
                      Powered by Google
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                variant="outline"
                className="dark:border-2"
                onClick={() => handleSocialLogin("github")}
                disabled={isLoading}
              >
                <Github className="h-8 w-8" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Sign in with GitHub</h4>
                  <p className="text-sm">
                    Connect your GitHub account for a seamless login experience.
                  </p>
                  <div className="flex items-center pt-2">
                    <span className="text-xs text-muted-foreground">
                      Powered by GitHub
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-white">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
