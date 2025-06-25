import { ICustomer, DocumentType } from "@/lib/redux/features/customerSlice";
import { ArrowRight, MapPin } from "lucide-react";
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

  const baseInputClasses =
    "w-full px-4 py-2 bg-white border border-gray-400 text-gray-900 placeholder:text-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition";

  const errorInputClasses = "border-red-600 focus:ring-red-600";

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 border-b border-gray-200 pb-4 mb-8">
        {initialData ? "Editar Cliente" : "Novo Cliente"}
      </h1>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col gap-6"
        noValidate
      >
        <div>
          <label
            htmlFor="name"
            className="block text-base font-semibold text-gray-900 mb-2"
          >
            Nome Completo
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "O nome é obrigatório." })}
            className={`${baseInputClasses} ${
              errors.name ? errorInputClasses : ""
            }`}
            placeholder="Insira o nome completo"
          />
          {errors.name && (
            <p className="font-medium text-red-600 text-sm mt-2">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="documentType"
              className="block text-base font-semibold text-gray-900 mb-2"
            >
              Tipo de Documento
            </label>
            <select
              id="documentType"
              {...register("documentType")}
              className={baseInputClasses}
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
              className="block text-base font-semibold text-gray-900 mb-2"
            >
              Número do Documento
            </label>
            <input
              id="document"
              type="text"
              {...register("document")}
              className={baseInputClasses}
              placeholder="Apenas números"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-base font-semibold text-gray-900 mb-2"
            >
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
              className={`${baseInputClasses} ${
                errors.email ? errorInputClasses : ""
              }`}
              placeholder="exemplo@email.com"
            />

            {errors.email && (
              <p className="font-medium text-red-600 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-base font-semibold text-gray-900 mb-2"
            >
              Telefone
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              className={baseInputClasses}
              placeholder="(84) 99999-9999"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-6 py-2.5 cursor-pointer bg-blue-600 shadow-2xs hover:shadow-lg hover:shadow-blue-500/50 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-300"
          >
            {initialData ? "Salvar Alterações" : "Salvar Cliente"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5  cursor-pointer bg-transparent border border-gray-500 text-gray-800 font-bold rounded-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300"
          >
            Cancelar
          </button>
        </div>
      </form>

      {initialData && (
        <div className="mt-12 pt-8 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div
              onClick={handleNavigateToAddresses}
              className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-bl-full"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg group-hover:shadow-blue-500/50 transition-shadow duration-300">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-blue-800">
                      Endereços
                    </h3>
                    <p className="text-blue-600 text-sm">
                      Gerenciar localizações
                    </p>
                  </div>
                </div>

                <p className="text-blue-700 text-sm mb-4">
                  Visualize e gerencie todos os endereços cadastrados para este
                  cliente
                </p>

                <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                  <span>Acessar</span>
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerForm;
