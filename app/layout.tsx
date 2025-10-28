// app/layout.tsx
import Providers from "./providers";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deborah Todo App",
  description: "Your tasks. Your notes. One smooth workspace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}
