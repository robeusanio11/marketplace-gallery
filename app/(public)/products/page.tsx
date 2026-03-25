import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { ProductCard } from "@/components/ProductCard";
import { ProductsFilter } from "@/components/ProductsFilter";
import type { Product } from "@/types/database";

export const revalidate = 60;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ available?: string }>;
}) {
  const { available } = await searchParams;
  const availableOnly = available === "1";

  let query = supabase
    .from("products")
    .select("*")
    .order("position", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (availableOnly) {
    query = query.eq("sold", false);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to fetch products:", error.message);
  }

  const items = (data as Product[] | null) ?? [];

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="font-heading text-3xl font-bold tracking-[0.2em] uppercase">Listings</h1>
        <Suspense>
          <ProductsFilter />
        </Suspense>
      </div>
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
