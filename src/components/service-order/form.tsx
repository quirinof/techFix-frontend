import {
  IServiceOrder,
  ServiceOrderStatus,
} from "@/lib/redux/features/serviceOrderSlice";
import { ICustomer } from "@/lib/redux/features/customerSlice";
import {
  FileText,
  Save,
  X,
  ClipboardList,
  User,
  List,
  ArrowRight,
  DollarSign,
} from "lucide-react";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type ServiceOrderFormData = Omit<IServiceOrder, "id" | "createdAt">;

interface ServiceOrderFormProps {
  initialData?: IServiceOrder;
  customers: ICustomer[];
  onSubmit: (data: ServiceOrderFormData, id?: number) => void;
  onCancel: () => void;
}

const ServiceOrderForm: React.FC<ServiceOrderFormProps> = ({
  initialData,
  customers,
  onSubmit,
  onCancel,
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceOrderFormData>({
    defaultValues: {
      description: undefined,
      status: ServiceOrderStatus.open,
      estimate: undefined,
      customerId: undefined,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        description: undefined,
        status: ServiceOrderStatus.open,
        estimate: undefined,
        customerId: undefined,
      });
    }
  }, [initialData, reset]);

  const onFormSubmit: SubmitHandler<ServiceOrderFormData> = (data) => {
    const payload = {
      ...data,
      customerId: Number(data.customerId),
      estimate: Number(data.estimate),
    };
    onSubmit(payload, initialData?.id);
  };

  const handleNavigateToItems = () => {
    router.push(`/admin/ordem-servico-item/${initialData?.id}`);
  };

  const handleNavigateToBill = () => {
    router.push(`/admin/ordem-servico-parcela/${initialData?.id}`);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {initialData ? "Editar Ordem de Serviço" : "Nova Ordem de Serviço"}
          </h1>
          <p className="text-gray-600">
            {initialData
              ? "Atualize as informações da ordem de serviço selecionada"
              : "Preencha os dados para cadastrar uma nova ordem de serviço"}
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
                <div>
                  <label
                    htmlFor="description"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <FileText className="w-4 h-4 text-gray-500" />
                    Descrição do Serviço
                  </label>
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "A descrição é obrigatória.",
                    })}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white transition-all duration-200 ${
                      errors.description
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    }`}
                    placeholder="Descreva o serviço solicitado..."
                  />
                  {errors.description && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="status"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                    >
                      <ClipboardList className="w-4 h-4 text-gray-500" />
                      Status
                    </label>
                    <select
                      id="status"
                      {...register("status")}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                    >
                      {Object.values(ServiceOrderStatus).map((status) => (
                        <option key={status} value={status}>
                          {status === "open"
                            ? "Aberta"
                            : status === "inProgress"
                            ? "Em andamento"
                            : status === "completed"
                            ? "Concluída"
                            : "Cancelada"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="estimate"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                    >
                      <FileText className="w-4 h-4 text-gray-500" />
                      Valor Estimado (R$)
                    </label>
                    <input
                      id="estimate"
                      type="number"
                      step="0.01"
                      min={0}
                      {...register("estimate", {
                        required: "O valor é obrigatório.",
                      })}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      placeholder="Ex: 150.00"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="customerId"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    Cliente
                  </label>
                  <select
                    id="customerId"
                    {...register("customerId", {
                      required: "Selecione um cliente.",
                    })}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 focus:outline-none focus:bg-white transition-all duration-200 ${
                      errors.customerId
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    }`}
                  >
                    <option value="" disabled>
                      Selecione um cliente
                    </option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.customerId && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {errors.customerId.message}
                    </p>
                  )}
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
                  {initialData ? "Salvar Alterações" : "Cadastrar OS"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {initialData && (
          <div className="mt-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Ações Adicionais
                </h3>

                <div
                  onClick={handleNavigateToItems}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                        <List className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          Gerenciar Itens
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Visualize e gerencie todos os itens desta OS
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                <div
                  onClick={handleNavigateToBill}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          Gerenciar Parcelas
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Visualize e gerencie as parcelas desta OS
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceOrderForm;
