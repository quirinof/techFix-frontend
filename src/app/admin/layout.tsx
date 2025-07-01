"use client";

import Navbar from "@/components/navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}
