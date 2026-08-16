"use client";

import { useEffect, useState } from "react";
import { z } from "zod";

import Link from "next/link";
import { Loader2, MailCheck, RefreshCw } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const RESEND_COOLDOWN = 60;
const emailSchema = z.email({
  message: "Please enter a valid email address",
});

export default function Page() {
  const searchParams = useSearchParams();

  const [emailInput, setEmailInput] = useState("");

  const queryEmail = searchParams.get("email");

  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();

  const knownEmail = queryEmail || session?.user?.email;
  const userEmail = knownEmail || emailInput;

  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const isValidEmail = !!userEmail && emailSchema.safeParse(userEmail).success;

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  if (isSessionLoading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const resendVerification = async () => {
    if (!userEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    const result = emailSchema.safeParse(userEmail);
    if (!result.success) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (cooldown > 0) {
      return;
    }

    try {
      setIsResending(true);

      const { error } = await authClient.sendVerificationEmail({
        email: userEmail,
        callbackURL: "/dashboard",
      });

      if (error) {
        throw new Error(error.message);
      }

      setCooldown(RESEND_COOLDOWN);

      toast.success("Verification email sent. Please check your inbox.");
    } catch (error) {
      console.error("Failed to resend verification email:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to resend verification email. Please try again.",
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader className="flex flex-col items-center text-center">
            <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MailCheck className="size-6" />
            </div>

            <CardTitle>Verify your email</CardTitle>

            <CardDescription>
              We&apos;ve sent a verification link to your email address. Click
              the link in that email to activate your account.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            {knownEmail ? (
              <div className="rounded-md bg-muted px-3 py-2 text-center text-sm font-medium">
                {knownEmail}
              </div>
            ) : (
              <Input
                type="email"
                placeholder="Enter your email address"
                className="text-center"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
            )}

            <p className="text-center text-sm text-muted-foreground">
              Didn&apos;t receive the email? Check your spam or junk folder. You
              can also request a new verification email.
            </p>

            <Button
              variant="outline"
              className="w-full"
              disabled={isResending || cooldown > 0 || !isValidEmail}
              onClick={resendVerification}
            >
              {isResending ? (
                <>
                  <RefreshCw className="size-4 animate-spin" />
                  Sending...
                </>
              ) : cooldown > 0 ? (
                `Resend available in ${cooldown}s`
              ) : (
                "Resend verification email"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Wrong email address?{" "}
              <Link
                href="/auth/signup"
                className="text-primary underline-offset-4 hover:underline"
              >
                Create a new account
              </Link>
            </p>

            <p className="text-center text-sm text-muted-foreground">
              Already verified?{" "}
              <Link
                href="/auth/login"
                className="text-primary underline-offset-4 hover:underline"
              >
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
