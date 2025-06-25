import { ICustomer, removecustomer } from "@/lib/redux/features/customerSlice";
import { RootState } from "@/lib/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import api from "@/lib/axios/api";

interface CustomerListProps {
  onEdit: (customer: ICustomer) => void;
  onAddNew: () => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ onEdit, onAddNew }) => {
  const customers = useSelector((state: RootState) => state.customer.customer);
  const dispatch = useDispatch();

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja remover este cliente?")) {
      await api.delete(`/customers/${id}`);
      dispatch(removecustomer(id));
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Painel de Clientes
        </h1>
        <button
          onClick={onAddNew}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 cursor-pointer  shadow-2xs hover:shadow-lg hover:shadow-blue-500/50 duration-300 bg-blue-600 text-white font-bold rounded-md  hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusCircle size={20} />
          Adicionar Cliente
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
                  Nome
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Documento
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Contato
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <h3 className="text-lg font-medium text-gray-600">
                        Nenhum cliente cadastrado
                      </h3>
                      <p className="text-sm text-gray-500">
                        Clique em "Adicionar Cliente" para começar.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {customer.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {customer.documentType?.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {customer.document}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {customer.email}
                      </div>
                      <div className="text-xs text-gray-500">
                        {customer.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-5">
                        <button
                          onClick={() => onEdit(customer)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Editar cliente"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Remover cliente"
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

export default CustomerList;
