"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: string, images: string[] | null) {
  const supabase = await createClient();

  // Delete images from storage first
  if (images && images.length > 0) {
    const paths = images.map((url) => {
      // Extract the storage path from the full URL
      const marker = "/product-images/";
      const idx = url.indexOf(marker);
      return idx !== -1 ? url.slice(idx + marker.length) : null;
    }).filter(Boolean) as string[];

    if (paths.length > 0) {
      await supabase.storage.from("product-images").remove(paths);
    }
  }

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin");
}

function storagePathFromUrl(url: string): string | null {
  const marker = "/product-images/";
  const idx = url.indexOf(marker);
  return idx !== -1 ? url.slice(idx + marker.length) : null;
}

export async function updateProduct(
  id: string,
  fields: {
    title: string;
    price: string | null;
    description: string | null;
    contact: string | null;
    link: string | null;
    sold: boolean;
  },
  finalImageUrls: string[],
  removedImageUrls: string[]
) {
  const supabase = await createClient();

  // Delete removed images from storage
  if (removedImageUrls.length > 0) {
    const paths = removedImageUrls
      .map(storagePathFromUrl)
      .filter(Boolean) as string[];
    if (paths.length > 0) {
      await supabase.storage.from("product-images").remove(paths);
    }
  }

  const { error } = await supabase
    .from("products")
    .update({
      ...fields,
      images: finalImageUrls.length > 0 ? finalImageUrls : null,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/product/${id}`);
}
