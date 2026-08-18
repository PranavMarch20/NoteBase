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
import { signUpUser } from "@/server/users";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, "Password is required (Minimum length: 8)"),
  confirmPassword: z
    .string()
    .min(8, "Confirm password is required (Minimum length: 8)"),
  name: z.string().min(1, "Name is required"),
});

export function SignupForm({
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
      confirmPassword: "",
      name: "",
    },
  });

  const signUpWithGoogle = async () => {
    try {
      setIsLoadingGoogle(true);
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error(error.message || "Failed to sign up with Google");
        return;
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to sign up with Google",
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

      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      const response = await signUpUser({
        email: values.email,
        password: values.password,
        name: values.name,
      });

      if (response.success) {
        toast.success("Please check your email to verify your account.");

        router.push(
          `/auth/verify-email?email=${encodeURIComponent(values.email)}`,
        );

        return;
      }

      toast.error(response.message);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create your account.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Enter your details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-5">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col gap-2"
                  >
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      className="text-md"
                      {...field}
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      autoComplete="name"
                      disabled={isLoading || isLoadingGoogle}
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
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
                    <FieldLabel htmlFor="password">Password</FieldLabel>
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
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center">
                      <FieldLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FieldLabel>
                    </div>
                    <Input
                      className="text-md"
                      {...field}
                      id="confirmPassword"
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
                    "Sign up"
                  )}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={signUpWithGoogle}
                  disabled={isLoadingGoogle}
                >
                  {isLoadingGoogle ? (
                    <Loader2 className="animate-spin size-4" />
                  ) : (
                    "Sign up with Google"
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link href="/auth/login">Log in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
