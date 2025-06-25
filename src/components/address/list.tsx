import { IAddress, removeAddress } from "@/lib/redux/features/addressSlice";
import { RootState } from "@/lib/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Endereços Cadastrados
        </h2>
        <button
          onClick={onAddNew}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 cursor-pointer shadow-2xs hover:shadow-lg hover:shadow-blue-500/50 duration-300 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusCircle size={20} />
          Adicionar Endereço
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Logradouro e Número
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Bairro
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Cidade / Estado / CEP
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {addresses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <h3 className="text-lg font-medium text-gray-600">
                        Nenhum endereço cadastrado
                      </h3>
                      <p className="text-sm text-gray-500">
                        Clique em "Adicionar Endereço" para começar.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                addresses.map((address) => (
                  <tr
                    key={address.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {address.street}, {address.number}
                      </div>
                      {address.complement && (
                        <div className="text-xs text-gray-500">
                          {address.complement}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {address.neighborhood}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {address.city} - {address.state.toUpperCase()}
                      </div>
                      {address.zipCode && (
                        <div className="text-xs text-gray-500">
                          CEP: {address.zipCode}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-5">
                        <button
                          onClick={() => onEdit(address)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Editar endereço"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(address.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Remover endereço"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddressList;
