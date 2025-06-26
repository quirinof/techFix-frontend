import { IAddress, removeAddress } from "@/lib/redux/features/addressSlice";
import { RootState } from "@/lib/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash2, PlusCircle, MapPin, Home } from "lucide-react";
import api from "@/lib/axios/api";
import { useParams } from "next/navigation";

interface AddressListProps {
  onEdit: (address: IAddress) => void;
  onAddNew: () => void;
}

const AddressList: React.FC<AddressListProps> = ({ onEdit, onAddNew }) => {
  const addresses = useSelector((state: RootState) => state.address.addresses);
  const dispatch = useDispatch();
  const { id } = useParams();

  const customerId = id;

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja remover este endereço?")) {
      await api.delete(`customers/${customerId}/addresses/${id}`);
      dispatch(removeAddress(id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Endereços Cadastrados
            </h1>
            <p className="text-gray-600">
              {addresses.length}{" "}
              {addresses.length === 1
                ? "endereço cadastrado"
                : "endereços cadastrados"}
            </p>
          </div>
          <button
            onClick={onAddNew}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <PlusCircle size={20} />
            Novo Endereço
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {addresses.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Nenhum endereço cadastrado
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Comece adicionando o primeiro endereço ao sistema.
                  </p>
                  <button
                    onClick={onAddNew}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
                  >
                    <PlusCircle size={18} />
                    Adicionar Primeiro Endereço
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
                      Endereço
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Bairro
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Localização
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {addresses.map((address, index) => (
                    <tr
                      key={address.id}
                      className="hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Home className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {address.street}, {address.number}
                            </div>
                            {address.complement && (
                              <div className="text-sm text-gray-500">
                                {address.complement}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">
                          {address.neighborhood}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900">
                            {address.city} - {address.state.toUpperCase()}
                          </div>
                          {address.zipCode && (
                            <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              CEP: {address.zipCode}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => onEdit(address)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar endereço"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(address.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remover endereço"
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

        {addresses.length > 0 && (
          <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <span>
              Mostrando {addresses.length}{" "}
              {addresses.length === 1 ? "resultado" : "resultados"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressList;
