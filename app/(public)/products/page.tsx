import { supabase } from "@/lib/supabase";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/database";

export const revalidate = 60;

export default async function ProductsPage() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("position", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch products:", error.message);
  }

  const items = (data as Product[] | null) ?? [];

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto w-full">
      <h1 className="text-2xl font-bold mb-6">Listings</h1>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
          <p className="text-lg">No listings yet.</p>
          <p className="text-sm mt-1">Check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
