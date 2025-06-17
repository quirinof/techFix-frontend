import api from "@/lib/axios/api";
import { useEffect, useState } from "react";
import { Wifi, WifiOff, LoaderCircle } from "lucide-react";

type StatusType = "loading" | "online" | "offline";

function APIStatusBar() {
  const [status, setStatus] = useState<StatusType>("loading");

  useEffect(() => {
    async function fetchStatus() {
      try {
        await api.get("/hello");
        setStatus("online");
      } catch (error) {
        console.error("Falha ao verificar o status da API:", error);
        setStatus("offline");
      }
    }

    fetchStatus();
  }, []);

  const statusConfig = {
    loading: {
      text: "Verificando...",
      icon: <LoaderCircle size={16} className="animate-spin" />,
      className: "bg-yellow-100 text-yellow-700",
    },
    online: {
      text: "API Online",
      icon: <Wifi size={16} />,
      className: "bg-green-100 text-green-700",
    },
    offline: {
      text: "API Offline",
      icon: <WifiOff size={16} />,
      className: "bg-red-100 text-red-700",
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <div
      className={`flex w-full items-center gap-x-3 rounded-lg p-3 text-sm font-semibold ${currentStatus.className}`}
    >
      {currentStatus.icon}
      <span>{currentStatus.text}</span>
    </div>
  );
}

export default APIStatusBar;
