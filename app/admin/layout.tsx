import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { SignOutButton } from "@/components/admin/SignOutButton";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-6 py-4 flex items-center justify-between gap-4">
        <h1 className="text-lg font-bold tracking-tight">Admin</h1>
        <div className="flex items-center gap-2">
          <Link href="/admin/new" className={cn(buttonVariants({ size: "sm" }))}>
            <Plus className="w-4 h-4 mr-1" />
            Add New Listing
          </Link>
          <SignOutButton />
        </div>
      </header>
      <main className="flex-1 px-6 py-8 max-w-5xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
