import LogoutBtn from "@/components/logout-btn";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Dashboard = async () => {
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
    <div className="flex flex-col gap-4 mx-auto">
      <h1>Dashboard</h1>
      <LogoutBtn />
    </div>
  );
};

export default Dashboard;