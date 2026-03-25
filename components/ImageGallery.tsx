"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
        No photos
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {/* Main image — click to open fullscreen */}
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-muted cursor-zoom-in block"
        >
          <Image
            src={images[active]}
            alt={`${title} - photo ${active + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </button>

      {/* Thumbnails — only shown when more than one image */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                i === active ? "border-foreground" : "border-transparent"
              }`}
            >
              <Image
                src={src}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-7 h-7" />
          </button>
          <div
            className="relative w-full h-full max-w-5xl max-h-screen p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt={`${title} - photo ${active + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
