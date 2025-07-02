import {
  IServiceOrderItem,
  ServiceOrderItemStatus,
  removeServiceOrderItem,
} from "@/lib/redux/features/serviceOrderItemSlice";
import { RootState } from "@/lib/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Pencil,
  Trash2,
  PlusCircle,
  ClipboardList,
  Laptop,
} from "lucide-react";
import api from "@/lib/axios/api";

interface ServiceOrderItemListProps {
  onEdit: (item: IServiceOrderItem) => void;
  onAddNew: () => void;
}

const statusLabel: Record<ServiceOrderItemStatus, string> = {
  pending: "Pendente",
  executing: "Em Andamento",
  completed: "Concluído",
};

const statusColor: Record<ServiceOrderItemStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  executing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

const ServiceOrderItemList: React.FC<ServiceOrderItemListProps> = ({
  onEdit,
  onAddNew,
}) => {
  const serviceOrderItems = useSelector(
    (state: RootState) => state.serviceOrderItem.serviceOrderItems
  );
  const equipments = useSelector(
    (state: RootState) => state.equipment.equipments
  );
  const dispatch = useDispatch();

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja remover este item?")) {
      await api.delete(`/service-order-item/${id}`);
      dispatch(removeServiceOrderItem(id));
    }
  };

  const getEquipmentInfo = (equipmentId: number | null) => {
    if (!equipmentId) return "Não especificado";
    const equipment = equipments.find((eq) => eq.id === equipmentId);
    if (!equipment) return `ID ${equipmentId}`;
    return `${equipment.brand || ""} ${equipment.model || ""} (S/N: ${
      equipment.serialNumber || "N/A"
    })`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Itens da Ordem de Serviço
            </h1>
            <p className="text-gray-600">
              {serviceOrderItems.length}{" "}
              {serviceOrderItems.length === 1
                ? "item cadastrado"
                : "itens cadastrados"}
            </p>
          </div>
          <button
            onClick={onAddNew}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <PlusCircle size={20} />
            Novo Item
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {serviceOrderItems.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <ClipboardList className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Nenhum item cadastrado
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Comece adicionando um item a OS
                  </p>
                  <button
                    onClick={onAddNew}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
                  >
                    <PlusCircle size={18} />
                    Adicionar Item
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
                      Equipamento
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {serviceOrderItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <ClipboardList className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {item.description || "Sem descrição"}
                            </div>
                            <div className="text-sm text-gray-500">
                              Item #{item.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Laptop className="w-4 h-4 text-gray-400" />
                          <span> {getEquipmentInfo(item.equipmentId)} </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            statusColor[
                              item.status || ServiceOrderItemStatus.PENDING
                            ]
                          }`}
                        >
                          {
                            statusLabel[
                              item.status || ServiceOrderItemStatus.PENDING
                            ]
                          }
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => onEdit(item)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar Item"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remover Item"
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

        {serviceOrderItems.length > 0 && (
          <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <span>
              Mostrando {serviceOrderItems.length}{" "}
              {serviceOrderItems.length === 1 ? "resultado" : "resultados"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceOrderItemList;
