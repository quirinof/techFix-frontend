import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import {
  IBill,
  BillStatus,
  PaymentMethod,
  removeBill,
} from "@/lib/redux/features/billSlice";
import {
  Pencil,
  Trash2,
  PlusCircle,
  ClipboardList,
  CalendarDays,
  DollarSign,
  CreditCard,
} from "lucide-react";
import api from "@/lib/axios/api";

interface BillListProps {
  onEdit: (bill: IBill) => void;
  onAddNew: () => void;
}

const statusLabel: Record<BillStatus, string> = {
  pending: "Pendente",
  paid: "Pago",
  overdue: "Vencido",
};

const statusColor: Record<BillStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  overdue: "bg-red-100 text-red-800",
};

const paymentMethodLabel: Record<PaymentMethod, string> = {
  cash: "Dinheiro",
  creditCard: "Cartão de Crédito",
  debitCard: "Cartão de Débito",
  pix: "Pix",
  boleto: "Boleto",
};

const BillList: React.FC<BillListProps> = ({ onEdit, onAddNew }) => {
  const bills = useSelector((state: RootState) => state.bill.bill);
  const serviceOrders = useSelector(
    (state: RootState) => state.serviceOrder.serviceOrder
  );
  const dispatch = useDispatch();

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja remover esta cobrança?")) {
      await api.delete(`/bills/${id}`);
      dispatch(removeBill(id));
    }
  };

  const getServiceOrderDescription = (serviceOrderId: number) => {
    const os = serviceOrders.find((o) => o.id === serviceOrderId);
    return os ? `${os.description} (#${os.id})` : `OS #${serviceOrderId}`;
  };

  // Ordena por data de vencimento (próximos no topo)
  const sortedBills = [...bills].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Cobranças</h1>
            <p className="text-gray-600">
              {bills.length}{" "}
              {bills.length === 1
                ? "cobrança cadastrada"
                : "cobranças cadastradas"}
            </p>
          </div>
          <button
            onClick={onAddNew}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <PlusCircle size={20} />
            Nova Cobrança
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {bills.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <ClipboardList className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Nenhuma cobrança cadastrada
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Comece adicionando uma cobrança ao sistema.
                  </p>
                  <button
                    onClick={onAddNew}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
                  >
                    <PlusCircle size={18} />
                    Adicionar Cobrança
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
                      Ordem de Serviço
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Valor
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Vencimento
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Pagamento
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
                  {sortedBills.map((bill) => (
                    <tr
                      key={bill.id}
                      className="hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <ClipboardList className="w-5 h-5 text-blue-600" />
                          <span>
                            {getServiceOrderDescription(bill.serviceOrderId)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span>
                            {Number(bill.amount).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <CalendarDays className="w-4 h-4 text-gray-400" />
                          <span>
                            {new Date(bill.dueDate).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <span>{paymentMethodLabel[bill.paymentMethod]}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            statusColor[bill.status || BillStatus.pending]
                          }`}
                        >
                          {statusLabel[bill.status || BillStatus.pending]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => onEdit(bill)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar Cobrança"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(bill.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remover Cobrança"
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

        {bills.length > 0 && (
          <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <span>
              Mostrando {bills.length}{" "}
              {bills.length === 1 ? "resultado" : "resultados"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillList;
