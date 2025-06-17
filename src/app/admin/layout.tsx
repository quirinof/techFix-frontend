"use client";

import APIStatusBar from "@/components/statusBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <APIStatusBar />;{children}
    </div>
  );
}
