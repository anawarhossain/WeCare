import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * কন্ডিশনাল টেইলউইন্ড ক্লাসগুলোকে কনফ্লিক্ট ছাড়া মার্জ করার পারফেক্ট ইউটিলিটি ফাংশন।
 * @param {...import("clsx").ClassValue} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
