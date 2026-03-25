import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { EditListingForm } from "@/components/admin/EditListingForm";
import type { Product } from "@/types/database";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  const product = data as Product | null;
  if (!product) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Edit Listing</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Update the details below.
        </p>
      </div>
      <EditListingForm product={product} />
    </div>
  );
}
