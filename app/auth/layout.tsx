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
      <div className="absolute flex justify-between px-5 pt-4 w-full">
        <Link
          href="/"
          aria-label="Back to Home"
          className="md:absolute md:px-20 md:py-4 md:left-6 md:top-6 z-10 inline-flex items-center gap-1.5 text-md font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
        <Logo className="md:absolute md:px-20 md:py-4 md:right-6 md:top-6 z-10 inline-flex items-center gap-1.5 text-md font-medium text-muted-foreground transition-colors hover:text-foreground" />
      </div>
      <div className="pt-6">
        {children}
      </div>
    </div>
  );
}

