import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  IBill,
  BillStatus,
  PaymentMethod,
} from "@/lib/redux/features/billSlice";
import {
  DollarSign,
  CreditCard,
  Calendar,
  ClipboardList,
  Save,
  X,
} from "lucide-react";

type BillFormData = Omit<IBill, "id">;

interface BillFormProps {
  initialData?: IBill;
  serviceOrderId: number;
  onSubmit: (data: BillFormData, id?: number) => void;
  onCancel: () => void;
}

const paymentMethodLabels: { [key in PaymentMethod]: string } = {
  [PaymentMethod.credit_card]: "Cartão de Crédito",
  [PaymentMethod.debit_card]: "Cartão de Débito",
  [PaymentMethod.pix]: "PIX",
  [PaymentMethod.cash]: "Dinheiro",
  [PaymentMethod.bank_slip]: "Boleto Bancário",
};

const billStatusLabels: { [key in BillStatus]: string } = {
  [BillStatus.pending]: "Pendente",
  [BillStatus.paid]: "Paga",
  [BillStatus.overdue]: "Vencida",
};

const BillForm: React.FC<BillFormProps> = ({
  initialData,
  serviceOrderId,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BillFormData>({
    defaultValues: {
      amount: 0,
      paymentMethod: PaymentMethod.pix,
      dueDate: new Date().toISOString().split("T")[0],
      status: BillStatus.pending,
      serviceOrderId: serviceOrderId,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        amount: Number(initialData.amount),
        dueDate: new Date(initialData.dueDate).toISOString().split("T")[0],
      });
    } else {
      reset({
        amount: 0,
        paymentMethod: PaymentMethod.pix,
        dueDate: new Date().toISOString().split("T")[0],
        status: BillStatus.pending,
        serviceOrderId: serviceOrderId,
      });
    }
  }, [initialData, reset, serviceOrderId]);

  const onFormSubmit: SubmitHandler<BillFormData> = (data) => {
    const payload = {
      ...data,
      amount: Number(data.amount),
      dueDate: new Date(data.dueDate).toISOString(),
      serviceOrderId: serviceOrderId,
    };
    onSubmit(payload, initialData?.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {initialData ? "Editar Fatura" : "Adicionar Fatura"}
          </h1>
          <p className="text-gray-600">
            {initialData
              ? "Atualize as informações da fatura"
              : "Preencha os dados para gerar uma nova fatura para a Ordem de Serviço"}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8">
            <form
              onSubmit={handleSubmit(onFormSubmit)}
              className="space-y-6"
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="amount"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    Valor (R$)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    {...register("amount", {
                      required: "O valor é obrigatório.",
                      valueAsNumber: true,
                      min: {
                        value: 0.01,
                        message: "O valor deve ser positivo.",
                      },
                    })}
                    step="0.01"
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 focus:outline-none focus:bg-white transition-all duration-200 ${
                      errors.amount
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    }`}
                    placeholder="0,00"
                  />
                  {errors.amount && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {errors.amount.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="dueDate"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <Calendar className="w-4 h-4 text-gray-500" />
                    Data de Vencimento
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    {...register("dueDate", {
                      required: "A data de vencimento é obrigatória.",
                    })}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 focus:outline-none focus:bg-white transition-all duration-200 ${
                      errors.dueDate
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    }`}
                  />
                  {errors.dueDate && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {errors.dueDate.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="paymentMethod"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <CreditCard className="w-4 h-4 text-gray-500" />
                    Método de Pagamento
                  </label>
                  <select
                    id="paymentMethod"
                    {...register("paymentMethod", {
                      required: "Selecione um método de pagamento.",
                    })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  >
                    {Object.values(PaymentMethod).map((method) => (
                      <option key={method} value={method}>
                        {paymentMethodLabels[method]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <ClipboardList className="w-4 h-4 text-gray-500" />
                    Status da Fatura
                  </label>
                  <select
                    id="status"
                    {...register("status", {
                      required: "O status é obrigatório.",
                    })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  >
                    {Object.values(BillStatus).map((status) => (
                      <option key={status} value={status}>
                        {billStatusLabels[status]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onCancel}
                  className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {initialData ? "Salvar Alterações" : "Adicionar Fatura"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillForm;
