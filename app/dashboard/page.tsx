import LogoutBtn from "@/components/logout-btn";
import PageWrapper from "@/components/page-wrapper";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  if (!session.user.emailVerified) {
    redirect("/auth/verify-email");
  }

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Test", href: "/test" }]}>
      <h1>Dashboard</h1>
      <LogoutBtn />
    </PageWrapper>
  );
}
