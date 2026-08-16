"use server";

import { auth } from "@/lib/auth";

export const signInUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    const e = error as Error;

    if (e.message === "Email not verified") {
      return {
        success: false,
        code: "EMAIL_NOT_VERIFIED",
        message: "Please verify your email before signing in.",
      };
    }

    return {
      success: false,
      code: "SIGN_IN_FAILED",
      message: e.message || "Failed to sign in",
    };
  }
};

export const signUpUser = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        callbackURL: "/dashboard",
      },
    });

    return { success: true, message: "Signed up successfully" };
  } catch (error) {
    const e = error as Error;
    console.log("This is the error from the server", e.message);
    return { success: false, message: e.message || "Failed to sign up" };
  }
};
