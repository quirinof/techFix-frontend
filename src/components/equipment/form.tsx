import { IEquipment, DeviceType } from "@/lib/redux/features/equipmentSlice";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Monitor, Hash, Tag, Save, X, Layers } from "lucide-react";

type EquipmentFormData = Omit<IEquipment, "id">;

interface EquipmentFormProps {
  initialData?: IEquipment;
  onSubmit: (data: EquipmentFormData, id?: number) => void;
  onCancel: () => void;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EquipmentFormData>({
    defaultValues: {
      deviceType: DeviceType.notebook,
      brand: undefined,
      model: undefined,
      serialNumber: undefined,
      customerId: undefined,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        deviceType: DeviceType.notebook,
        brand: undefined,
        model: undefined,
        serialNumber: undefined,
        customerId: undefined,
      });
    }
  }, [initialData, reset]);

  const onFormSubmit: SubmitHandler<EquipmentFormData> = (data) => {
    onSubmit(data, initialData?.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {initialData ? "Editar Equipamento" : "Novo Equipamento"}
          </h1>
          <p className="text-gray-600">
            {initialData
              ? "Atualize as informações do equipamento selecionado"
              : "Preencha os dados para cadastrar um novo equipamento"}
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
                    htmlFor="deviceType"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <Layers className="w-4 h-4 text-gray-500" />
                    Tipo de Equipamento
                  </label>
                  <select
                    id="deviceType"
                    {...register("deviceType", {
                      required: "O tipo é obrigatório.",
                    })}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 focus:outline-none focus:bg-white transition-all duration-200 ${
                      errors.deviceType
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    }`}
                  >
                    {Object.values(DeviceType).map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                  {errors.deviceType && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {errors.deviceType.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="brand"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                    >
                      <Tag className="w-4 h-4 text-gray-500" />
                      Marca
                    </label>
                    <input
                      id="brand"
                      type="text"
                      {...register("brand")}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      placeholder="Ex: Dell, Apple, Samsung"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="model"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                    >
                      <Monitor className="w-4 h-4 text-gray-500" />
                      Modelo
                    </label>
                    <input
                      id="model"
                      type="text"
                      {...register("model")}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      placeholder="Ex: Inspiron 15, iPhone 12"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="serialNumber"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                    >
                      <Hash className="w-4 h-4 text-gray-500" />
                      Nº de Série
                    </label>
                    <input
                      id="serialNumber"
                      type="text"
                      {...register("serialNumber")}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      placeholder="Ex: SN123456789"
                    />
                  </div>
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
                  {initialData ? "Salvar Alterações" : "Salvar Equipamento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentForm;
