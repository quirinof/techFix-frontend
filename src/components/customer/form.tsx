import { ICustomer, DocumentType } from "@/lib/redux/features/customerSlice";
import {
  ArrowRight,
  MapPin,
  User,
  Mail,
  Phone,
  FileText,
  Save,
  X,
  Monitor,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type CustomerFormData = Omit<ICustomer, "id" | "createdAt">;

interface CustomerFormProps {
  initialData?: ICustomer;
  onSubmit: (data: CustomerFormData, id?: number) => void;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormData>({
    defaultValues: {
      name: undefined,
      document: undefined,
      documentType: DocumentType.cpf,
      phone: undefined,
      email: undefined,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        name: undefined,
        document: undefined,
        documentType: DocumentType.cpf,
        phone: undefined,
        email: undefined,
      });
    }
  }, [initialData, reset]);

  const onFormSubmit: SubmitHandler<CustomerFormData> = (data) => {
    onSubmit(data, initialData?.id);
  };

  const handleNavigateToAddresses = () => {
    if (initialData?.id) {
      router.push(`/admin/endereco/${initialData.id}`);
    }
  };

  const handleNavigateToEquipments = () => {
    if (initialData?.id) {
      router.push(`/admin/equipamento/${initialData.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {initialData ? "Editar Cliente" : "Novo Cliente"}
          </h1>
          <p className="text-gray-600">
            {initialData
              ? "Atualize as informações do cliente selecionado"
              : "Preencha os dados para cadastrar um novo cliente"}
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
                    htmlFor="name"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    Nome Completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", { required: "O nome é obrigatório." })}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white transition-all duration-200 ${
                      errors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    }`}
                    placeholder="Digite o nome completo do cliente"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="documentType"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                    >
                      <FileText className="w-4 h-4 text-gray-500" />
                      Tipo de Documento
                    </label>
                    <select
                      id="documentType"
                      {...register("documentType")}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                    >
                      {Object.values(DocumentType).map((type) => (
                        <option key={type} value={type}>
                          {type.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="document"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                    >
                      <FileText className="w-4 h-4 text-gray-500" />
                      Número do Documento
                    </label>
                    <input
                      id="document"
                      type="text"
                      {...register("document")}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      placeholder="000.000.000-00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                    >
                      <Mail className="w-4 h-4 text-gray-500" />
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        pattern: {
                          value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: "Formato de e-mail inválido.",
                        },
                      })}
                      className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white transition-all duration-200 ${
                        errors.email
                          ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                          : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      }`}
                      placeholder="cliente@exemplo.com"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                        <X className="w-4 h-4" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                    >
                      <Phone className="w-4 h-4 text-gray-500" />
                      Telefone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      placeholder="(84) 99999-9999"
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
                  {initialData ? "Salvar Alterações" : "Cadastrar Cliente"}
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
                  onClick={handleNavigateToAddresses}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          Gerenciar Endereços
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Visualize e gerencie todos os endereços deste cliente
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                <div
                  onClick={handleNavigateToEquipments}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                        <Monitor className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          Gerenciar Equipamentos
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Visualize e gerencie todos os equipamentos deste
                          cliente
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

export default CustomerForm;
