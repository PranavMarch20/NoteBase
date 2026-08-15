import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <Link
        href="/"
        aria-label="Go back"
        className="absolute px-20 py-4 left-6 top-6 z-10 inline-flex items-center gap-1.5 text-md font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Backs
      </Link>
      <Logo className="absolute px-20 py-4 right-6 top-6 z-10 inline-flex items-center gap-1.5 text-md font-medium text-muted-foreground transition-colors hover:text-foreground" />
      {children}
    </div>
  );
}
