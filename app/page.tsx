// app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SiTodoist } from "react-icons/si";
import { useState } from "react";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname() ?? "/";

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <nav className="flex p-4 justify-center items-center gap-4 shadow-md bg-white">
        <SiTodoist className="h-10 w-10 text-blue-500" />
        <h1 className="text-2xl font-bold text-gray-800 md:flex-1 text-center">
          Deborah Okolo App
        </h1>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center p-6">
        <h2 className="font-bold text-xl md:text-3xl text-center mb-4">
          Your tasks. Your notes. One smooth workspace.
        </h2>

        <p className="text-gray-600 text-center max-w-md">
          No clutter, no chaos.{" "}
          <span className="font-bold text-blue-500">Deborah&apos;s App</span> helps
          you stay on top of your thoughts and to-dos, without breaking your
          flow.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <Link href="/login" className="w-[10rem]">
            <button
              className={
                "w-full px-4 py-2 rounded " +
                (isActive("/login")
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-black hover:bg-blue-500 hover:text-white")
              }
            >
              Log In
            </button>
          </Link>

          <Link href="/signup" className="w-[10rem]">
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={
                "w-full px-4 py-2 rounded border border-blue-500 transition " +
                (isHovered
                  ? "bg-white text-black"
                  : "bg-blue-200 text-blue-700")
              }
            >
              Sign Up
            </button>
          </Link>
        </div>
      </section>

      {/* Image content */}
      <section className="mt-8 w-full flex justify-center">
        {/* Use next/image if you want optimization. The file should be in /public/images/hero_img.webp */}
        <div className="relative w-full max-w-6xl h-[340px] md:h-[420px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/hero_img.webp"
            alt="Hero"
            fill
            style={{ objectFit: "cover" }}
            priority={true}
          />
        </div>
      </section>
    </div>
  );
}
