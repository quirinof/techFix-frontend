import {
  IServiceOrderItem,
  ServiceOrderItemStatus,
} from "@/lib/redux/features/serviceOrderItemSlice";
import { IEquipment } from "@/lib/redux/features/equipmentSlice";
import {
  FileText,
  Save,
  X,
  ClipboardList,
  Laptop,
  ArrowRight,
  List,
} from "lucide-react";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type ServiceOrderItemFormData = Omit<IServiceOrderItem, "id">;

interface ServiceOrderItemFormProps {
  initialData?: IServiceOrderItem;
  equipments: IEquipment[];
  serviceOrderId: number;
  onSubmit: (data: ServiceOrderItemFormData, id?: number) => void;
  onCancel: () => void;
}

const ServiceOrderItemForm: React.FC<ServiceOrderItemFormProps> = ({
  initialData,
  equipments,
  serviceOrderId,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceOrderItemFormData>({
    defaultValues: {
      description: "",
      status: ServiceOrderItemStatus.PENDING,
      equipmentId: undefined,
      serviceOrderId: serviceOrderId,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        description: "",
        status: ServiceOrderItemStatus.PENDING,
        equipmentId: undefined,
        serviceOrderId: serviceOrderId,
      });
    }
  }, [initialData, reset, serviceOrderId]);

  const onFormSubmit: SubmitHandler<ServiceOrderItemFormData> = (data) => {
    const payload = {
      ...data,
      equipmentId: Number(data.equipmentId),
      serviceOrderId: serviceOrderId,
    };
    onSubmit(payload, initialData?.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {initialData
              ? "Editar Item do Serviço"
              : "Adicionar Item ao Serviço"}
          </h1>
          <p className="text-gray-600">
            {initialData
              ? "Atualize as informações do item selecionado"
              : "Preencha os dados para adicionar um novo item à Ordem de Serviço"}
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
                    htmlFor="equipmentId"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <Laptop className="w-4 h-4 text-gray-500" />
                    Equipamento
                  </label>
                  <select
                    id="equipmentId"
                    {...register("equipmentId", {
                      required: "Selecione um equipamento.",
                    })}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 focus:outline-none focus:bg-white transition-all duration-200 ${
                      errors.equipmentId
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    }`}
                  >
                    <option value="" disabled>
                      Selecione um equipamento
                    </option>
                    {equipments.map((eq) => (
                      <option key={eq.id} value={eq.id}>
                        {eq.brand} {eq.model} (S/N: {eq.serialNumber || "N/A"})
                      </option>
                    ))}
                  </select>
                  {errors.equipmentId && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {errors.equipmentId.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <FileText className="w-4 h-4 text-gray-500" />
                    Descrição do Problema/Serviço
                  </label>
                  <textarea
                    id="description"
                    {...register("description", {
                      required: true,
                    })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                    placeholder="Descreva o problema relatado ou o serviço a ser executado..."
                    rows={3}
                  />
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <ClipboardList className="w-4 h-4 text-gray-500" />
                    Status do Item
                  </label>
                  <select
                    id="status"
                    {...register("status")}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  >
                    {Object.values(ServiceOrderItemStatus)
                      .filter((status) =>
                        !initialData
                          ? status !== ServiceOrderItemStatus.EXECUTING
                          : true
                      )
                      .map((status) => (
                        <option key={status} value={status}>
                          {
                            {
                              [ServiceOrderItemStatus.PENDING]: "Pendente",
                              [ServiceOrderItemStatus.COMPLETED]: "Concluído",
                              [ServiceOrderItemStatus.CANCELED]: "Cancelado",
                              [ServiceOrderItemStatus.EXECUTING]:
                                "Em andamento",
                            }[status]
                          }
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
                  {initialData ? "Salvar Alterações" : "Adicionar Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceOrderItemForm;
