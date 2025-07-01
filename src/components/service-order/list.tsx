import {
  IServiceOrder,
  ServiceOrderStatus,
  removeServiceOrder,
} from "@/lib/redux/features/serviceOrderSlice";
import { RootState } from "@/lib/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Pencil,
  Trash2,
  PlusCircle,
  ClipboardList,
  Calendar,
  User,
} from "lucide-react";
import api from "@/lib/axios/api";

interface ServiceOrderListProps {
  onEdit: (serviceOrder: IServiceOrder) => void;
  onAddNew: () => void;
}

const statusLabel: Record<ServiceOrderStatus, string> = {
  open: "Aberta",
  inProgress: "Em andamento",
  completed: "Concluída",
  canceled: "Cancelada",
};

const statusColor: Record<ServiceOrderStatus, string> = {
  open: "bg-yellow-100 text-yellow-800",
  inProgress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  canceled: "bg-red-100 text-red-800",
};

const ServiceOrderList: React.FC<ServiceOrderListProps> = ({
  onEdit,
  onAddNew,
}) => {
  const serviceOrders = useSelector(
    (state: RootState) => state.serviceOrder.serviceOrder
  );

  const sortedServiceOrders = [...serviceOrders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const customers = useSelector((state: RootState) => state.customer.customer);
  const dispatch = useDispatch();

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja remover esta OS?")) {
      await api.delete(`/service-orders/${id}`);
      dispatch(removeServiceOrder(id));
    }
  };

  const getCustomerName = (customerId: number) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? customer.name : `ID ${customerId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Gerenciamento de OS
            </h1>
            <p className="text-gray-600">
              {serviceOrders.length}{" "}
              {serviceOrders.length === 1
                ? "ordem de serviço cadastrada"
                : "ordens de serviço cadastradas"}
            </p>
          </div>
          <button
            onClick={onAddNew}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <PlusCircle size={20} />
            Nova OS
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {serviceOrders.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <ClipboardList className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Nenhuma OS cadastrada
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Comece adicionando sua primeira ordem de serviço ao sistema.
                  </p>
                  <button
                    onClick={onAddNew}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
                  >
                    <PlusCircle size={18} />
                    Adicionar Primeira OS
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Descrição
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Cliente
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Criada em
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedServiceOrders.map((os) => (
                    <tr
                      key={os.id}
                      className="hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <ClipboardList className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {os.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <User className="w-4 h-4 text-gray-400" />
                          <span> {getCustomerName(os.customerId)} </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            statusColor[os.status || ServiceOrderStatus.open]
                          }`}
                        >
                          {statusLabel[os.status || ServiceOrderStatus.open]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-2 text-sm text-gray-700">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(os.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => onEdit(os)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar OS"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(os.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remover OS"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {serviceOrders.length > 0 && (
          <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <span>
              Mostrando {serviceOrders.length}{" "}
              {serviceOrders.length === 1 ? "resultado" : "resultados"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceOrderList;
