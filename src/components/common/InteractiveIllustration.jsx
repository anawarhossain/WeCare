"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function InteractiveIllustration() {
  const imgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const img = imgRef.current;
      if (!img) return;
      const rect = img.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const moveX = (e.clientX - centerX) / 40;
      const moveY = (e.clientY - centerY) / 40;
      img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full max-w-md mb-8">
      {/* Ambient glow */}
      <div
        className="absolute -z-10 inset-0 rounded-full blur-3xl scale-125"
        style={{ backgroundColor: "var(--primary-100)", opacity: 0.4 }}
      />
      <Image
        ref={imgRef}
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoOGTwUz7S0XOvReaTmLTZeD-4ZlNjvDK8saJb9yAF8NV6vSokDoS46Wd1L6NqkqxZgL_XUSHEPC9LOxIxzqJEkj_XFsyCNyXixOySrRQXB96yyVH7Rfpjmqu8IteZvcbPSyyFuOnwg1CNjr9CIvvCZolGsrom-npD3W4ViChNyVxG13_7b5veFTilCDVy2VHms7lxRbTQzG5N7GJP_taO8xkkRQQYeaNSQBh8a3FBZnIpk9znukC1PSCxfOlbxEoYxjTB3e8faF8"
        alt="Page not found illustration"
        width={500}
        height={400}
        priority
        className="w-full h-auto drop-shadow-xl transition-transform duration-300 hover:scale-105"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}