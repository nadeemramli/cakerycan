"use client";

import { Share2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  excerpt: string;
}

export function ShareButtons({ title, excerpt }: ShareButtonsProps) {
  return (
    <div className="flex justify-center gap-4">
      <button
        className="inline-flex items-center px-4 py-2 rounded-lg bg-pink-100 text-pink-800 hover:bg-pink-200 transition-colors"
        onClick={() => {
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              title
            )}&url=${encodeURIComponent(window.location.href)}`,
            "_blank"
          );
        }}
      >
        Share on Twitter
      </button>
      <button
        className="inline-flex items-center px-4 py-2 rounded-lg bg-pink-100 text-pink-800 hover:bg-pink-200 transition-colors"
        onClick={() => {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}`,
            "_blank"
          );
        }}
      >
        Share on Facebook
      </button>
    </div>
  );
}

export function ShareIcon() {
  return (
    <button
      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      onClick={() => {
        navigator.share({
          title: document.title,
          text:
            document
              .querySelector('meta[name="description"]')
              ?.getAttribute("content") || "",
          url: window.location.href,
        });
      }}
    >
      <Share2 className="h-5 w-5 text-gray-600" />
    </button>
  );
}
