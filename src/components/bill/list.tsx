import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IBill,
  BillStatus,
  PaymentMethod,
  removeBill,
} from "@/lib/redux/features/billSlice";
import { RootState } from "@/lib/redux/store";
import api from "@/lib/axios/api";
import {
  Pencil,
  Trash2,
  PlusCircle,
  FileText,
  DollarSign,
  Calendar,
  CreditCard,
} from "lucide-react";

interface BillListProps {
  onEdit: (bill: IBill) => void;
  onAddNew: () => void;
}

const statusLabel: Record<BillStatus, string> = {
  [BillStatus.pending]: "Pendente",
  [BillStatus.paid]: "Paga",
  [BillStatus.overdue]: "Vencida",
};

const statusColor: Record<BillStatus, string> = {
  [BillStatus.pending]: "bg-yellow-100 text-yellow-800",
  [BillStatus.paid]: "bg-green-100 text-green-800",
  [BillStatus.overdue]: "bg-red-100 text-red-800",
};

const paymentMethodLabel: Record<PaymentMethod, string> = {
  [PaymentMethod.credit_card]: "Cartão de Crédito",
  [PaymentMethod.debit_card]: "Cartão de Débito",
  [PaymentMethod.pix]: "PIX",
  [PaymentMethod.cash]: "Dinheiro",
  [PaymentMethod.bank_slip]: "Boleto",
};

const BillList: React.FC<BillListProps> = ({ onEdit, onAddNew }) => {
  const bills = useSelector((state: RootState) => state.bill.bills);
  const dispatch = useDispatch();

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja remover esta fatura?")) {
      try {
        await api.delete(`/bill/${id}`);
        dispatch(removeBill(id));
      } catch (error) {
        console.error("Falha ao remover a fatura:", error);
        alert("Não foi possível remover a fatura. Tente novamente.");
      }
    }
  };

  const formatCurrency = (amount: number | any) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Faturas da Ordem de Serviço
            </h1>
            <p className="text-gray-600">
              {bills.length}{" "}
              {bills.length === 1 ? "fatura cadastrada" : "faturas cadastradas"}
            </p>
          </div>
          <button
            onClick={onAddNew}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <PlusCircle size={20} />
            Nova Fatura
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {bills.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <FileText className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Nenhuma fatura cadastrada
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Comece adicionando uma fatura à Ordem de Serviço.
                  </p>
                  <button
                    onClick={onAddNew}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
                  >
                    <PlusCircle size={18} />
                    Adicionar Fatura
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
                  {bills.map((bill) => (
                    <tr
                      key={bill.id}
                      className="hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {formatCurrency(bill.amount)}
                            </div>
                            <div className="text-sm text-gray-500">
                              Fatura #{bill.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{formatDate(bill.dueDate)}</span>
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
                            statusColor[bill.status]
                          }`}
                        >
                          {statusLabel[bill.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => onEdit(bill)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar Fatura"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(bill.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remover Fatura"
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
      </div>
    </div>
  );
};

export default BillList;
