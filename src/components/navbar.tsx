import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, FileText, Users, DollarSign, LogOut } from "lucide-react";
import APIStatusBar from "./statusBar";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith("/admin");

  const handleGoBack = () => {
    router.back();
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <nav className=" top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="fixed left-2">
            <APIStatusBar />
          </div>

          <div className="flex items-center">
            <button
              onClick={handleGoBack}
              className={`${
                !isAdminPath ? "invisible" : "visible"
              }  flex cursor-pointer  items-center space-x-2 px-3 py-2 rounded-md text-white hover:bg-white/10 transition-all duration-200 ease-in-out`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar</span>
            </button>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => handleNavigation("/admin/ordem-servico")}
              className="flex cursor-pointer  items-center space-x-2 px-4 py-2 rounded-md text-white hover:bg-white/10 transition-all duration-200 ease-in-out group"
            >
              <FileText className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Ordem de Serviço</span>
            </button>

            <button
              onClick={() => handleNavigation("/admin/cliente")}
              className="flex  cursor-pointer  items-center space-x-2 px-4 py-2 rounded-md text-white hover:bg-white/10 transition-all duration-200 ease-in-out group"
            >
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Clientes</span>
            </button>

            <button
              onClick={() => handleNavigation("/admin/financeiro")}
              className="flex cursor-pointer  items-center space-x-2 px-4 py-2 rounded-md text-white hover:bg-white/10 transition-all duration-200 ease-in-out group"
            >
              <DollarSign className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">Financeiro</span>
            </button>
          </div>

          <div className="flex items-center">
            <button
              onClick={handleGoBack}
              className="cursor-pointer flex items-center space-x-2 px-3 py-2 rounded-md text-white hover:bg-white/10 transition-all duration-200 ease-in-out"
            >
              <span className="font-medium">Sair</span>
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
