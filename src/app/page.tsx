"use client";
import React, { useState } from "react";
import {
  Users,
  ClipboardList,
  DollarSign,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function HomeDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  const menuItems = [
    {
      id: "clients",
      title: "Clientes",
      url: "cliente",
      icon: Users,
      color: "from-blue-100 to-blue-200",
      hoverColor: "hover:from-blue-200 hover:to-blue-300",
      description: "Gerencie sua base de clientes",
      iconBg: "bg-blue-500",
    },
    {
      id: "orders",
      title: "Ordem de Serviços",
      url: "ordemservico",
      icon: ClipboardList,
      color: "from-green-100 to-green-200",
      hoverColor: "hover:from-green-200 hover:to-green-300",
      description: "Controle suas ordens de serviço",
      iconBg: "bg-green-500",
    },
    {
      id: "financial",
      title: "Financeiro",
      url: "financeiro",
      icon: DollarSign,
      color: "from-purple-100 to-purple-200",
      hoverColor: "hover:from-purple-200 hover:to-purple-300",
      description: "Acompanhe suas finanças",
      iconBg: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo e Menu Mobile */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {sidebarOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
              <div className="ml-4 md:ml-0">
                <h1 className="text-xl font-bold text-gray-800">
                  Sistema de Controle
                </h1>
                <p className="text-sm text-gray-500">Painel de Administração</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={(e) => {
                  Cookies.set("accessToken", "", { expires: 7 });
                  router.push("/login");
                }}
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white p-2 rounded-lg transition-colors shadow-sm"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={(e) => {
                    router.push(`/admin/${item.url} `);
                  }}
                  className={`bg-gradient-to-r ${item.color} ${item.hoverColor} rounded-2xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg border border-white/50`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center shadow-sm`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <div className="mt-4 flex items-center text-blue-600">
                    <span className="text-sm font-medium">Acessar módulo</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
