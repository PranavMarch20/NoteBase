import { db } from "@/db/drizzle";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import VerificationEmail from "@/components/emails/verification-email";
import { ResetPasswordEmail } from "@/components/emails/reset-password-email";
import { toast } from "sonner";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "NoteBase <onboarding@resend.dev>",
        to: [user.email],
        subject: "Verify your email address",
        react: VerificationEmail({
          userName: user.name,
          verificationUrl: url,
        }),
      });
    },
    sendOnSignUp: true,
    sendOnSignIn: true,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    
    sendResetPassword: async ({user, url}) => {
      void resend.emails.send({
        from: "NoteBase <onboarding@resend.dev>",
        to: [user.email],
        subject: "Reset your password",
        react: ResetPasswordEmail({
          userName: user.name,
          resetUrl: url,
          requestTime: new Date().toLocaleString(),
          userEmail: user.email,
        }),
      });
    },
    onPasswordReset: async ({ user }) => {
      toast.success(`Password for user ${user.email} has been reset.`);
    },
  },
  plugins: [nextCookies()],
});
