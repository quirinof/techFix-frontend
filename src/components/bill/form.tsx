import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  IBill,
  BillStatus,
  PaymentMethod,
} from "@/lib/redux/features/billSlice";
import {
  List,
  Save,
  X,
  CalendarDays,
  DollarSign,
  CreditCard,
  ClipboardList,
} from "lucide-react";

type BillFormData = Omit<IBill, "id">;

interface BillFormProps {
  initialData?: IBill;
  serviceOrders: { id: number; description: string }[];
  onSubmit: (data: BillFormData, id?: number) => void;
  onCancel: () => void;
}

const paymentMethodLabel: Record<PaymentMethod, string> = {
  cash: "Dinheiro",
  creditCard: "Cartão de Crédito",
  debitCard: "Cartão de Débito",
  pix: "Pix",
  boleto: "Boleto",
};

const billStatusLabel: Record<BillStatus, string> = {
  pending: "Pendente",
  paid: "Pago",
  overdue: "Vencido",
};

const BillForm: React.FC<BillFormProps> = ({
  initialData,
  serviceOrders,
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
      paymentMethod: PaymentMethod.cash,
      dueDate: "",
      status: BillStatus.pending,
      serviceOrderId: serviceOrders[0]?.id ?? 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        dueDate: initialData.dueDate.slice(0, 10), // Formato YYYY-MM-DD
      });
    } else {
      reset({
        amount: 0,
        paymentMethod: PaymentMethod.cash,
        dueDate: "",
        status: BillStatus.pending,
        serviceOrderId: serviceOrders[0]?.id ?? 0,
      });
    }
  }, [initialData, reset, serviceOrders]);

  const onFormSubmit: SubmitHandler<BillFormData> = (data) => {
    onSubmit(
      {
        ...data,
        amount: Number(data.amount),
        serviceOrderId: Number(data.serviceOrderId),
        dueDate: data.dueDate, // já está em string ISO de input type="date"
      },
      initialData?.id
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {initialData ? "Editar Cobrança" : "Adicionar Cobrança"}
          </h1>
          <p className="text-gray-600">
            {initialData
              ? "Atualize as informações da cobrança selecionada"
              : "Preencha os dados para adicionar uma nova cobrança"}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8">
            <form
              onSubmit={handleSubmit(onFormSubmit)}
              className="space-y-6"
              noValidate
            >
              <div className="space-y-6">
                {/* Valor */}
                <div>
                  <label
                    htmlFor="amount"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    Valor
                  </label>
                  <input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    {...register("amount", { required: "Informe o valor." })}
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
                {/* Data de vencimento */}
                <div>
                  <label
                    htmlFor="dueDate"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <CalendarDays className="w-4 h-4 text-gray-500" />
                    Data de Vencimento
                  </label>
                  <input
                    id="dueDate"
                    type="date"
                    {...register("dueDate", {
                      required: "Informe a data de vencimento.",
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
                {/* Ordem de Serviço vinculada */}
                <div>
                  <label
                    htmlFor="serviceOrderId"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <ClipboardList className="w-4 h-4 text-gray-500" />
                    Ordem de Serviço
                  </label>
                  <select
                    id="serviceOrderId"
                    {...register("serviceOrderId", {
                      required: "Selecione a OS.",
                    })}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 focus:outline-none focus:bg-white transition-all duration-200 ${
                      errors.serviceOrderId
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    }`}
                  >
                    <option value="" disabled>
                      Selecione a OS
                    </option>
                    {serviceOrders.map((os) => (
                      <option key={os.id} value={os.id}>
                        {os.description} (#{os.id})
                      </option>
                    ))}
                  </select>
                  {errors.serviceOrderId && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {errors.serviceOrderId.message}
                    </p>
                  )}
                </div>
                {/* Forma de Pagamento */}
                <div>
                  <label
                    htmlFor="paymentMethod"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <CreditCard className="w-4 h-4 text-gray-500" />
                    Forma de Pagamento
                  </label>
                  <select
                    id="paymentMethod"
                    {...register("paymentMethod", {
                      required: "Selecione a forma de pagamento.",
                    })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  >
                    {Object.values(PaymentMethod).map((pm) => (
                      <option key={pm} value={pm}>
                        {paymentMethodLabel[pm]}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <List className="w-4 h-4 text-gray-500" />
                    Status
                  </label>
                  <select
                    id="status"
                    {...register("status", { required: "Selecione o status." })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  >
                    {Object.values(BillStatus).map((status) => (
                      <option key={status} value={status}>
                        {billStatusLabel[status]}
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
                  {initialData ? "Salvar Alterações" : "Adicionar Cobrança"}
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
