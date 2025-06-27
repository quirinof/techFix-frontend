"use client";
import React from "react";
import Navbar from "@/components/navbar";

export default function HomeDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Bem-vindo ao Dashboard
            </h2>
            <p className="text-gray-600">
              Aqui está um resumo das suas atividades recentes
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
