import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  if (!session.user.emailVerified) {
    redirect("/auth/verify-email");
  }
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}
