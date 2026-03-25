import { createClient } from "@/lib/supabase-server";
import { ProductList } from "@/components/admin/ProductList";
import type { Product } from "@/types/database";

export default async function AdminPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("position", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch products:", error.message);
  }

  const products = (data as Product[] | null) ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-muted-foreground">
          {products.length} {products.length === 1 ? "listing" : "listings"}
        </h2>
      </div>
      <ProductList products={products} />
    </div>
  );
}
