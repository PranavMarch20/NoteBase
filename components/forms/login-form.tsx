"use client";

import { z } from "zod";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signInUser } from "@/server/users";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, "Password is required (Minimum length: 8)"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInWithGoogle = async () => {
    try {
      setIsLoadingGoogle(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error(error.message || "Failed to sign in with Google");
        return;
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to sign in with Google",
      );
    } finally {
      setTimeout(() => {
        setIsLoadingGoogle(false);
      }, 5000);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const response = await signInUser({
        email: values.email,
        password: values.password,
      });

      if (response.success) {
        toast.success(response.message);
        router.push("/dashboard");
        return;
      }

      if (response.code === "EMAIL_NOT_VERIFIED") {
        toast.error(response.message);
        router.push(
          `/auth/verify-email?email=${encodeURIComponent(values.email)}`,
        );
        return;
      }

      toast.error(response.message);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-6">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col gap-2"
                  >
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      className="text-md"
                      {...field}
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      autoComplete="email"
                      disabled={isLoading || isLoadingGoogle}
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link
                        href="/auth/forgot-password"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      className="text-md"
                      {...field}
                      id="password"
                      type="password"
                      placeholder="********"
                      autoComplete="current-password"
                      disabled={isLoading || isLoadingGoogle}
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Field>
                <Button type="submit" disabled={isLoading || isLoadingGoogle}>
                  {isLoading ? (
                    <Loader2 className="animate-spin size-4" />
                  ) : (
                    "Login"
                  )}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={signInWithGoogle}
                  disabled={isLoadingGoogle || isLoading}
                >
                  {isLoadingGoogle ? (
                    <Loader2 className="animate-spin size-4" />
                  ) : (
                    "Login with Google"
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
