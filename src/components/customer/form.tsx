import { ICustomer, DocumentType } from "@/lib/redux/features/customerSlice";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type CustomerFormData = Omit<ICustomer, "id" | "createdAt">;

interface CustomerFormProps {
  initialData?: ICustomer;
  onSubmit: (data: CustomerFormData) => void;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
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
    onSubmit(data);
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
                  value: /^\S+@\S+$/i,
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

        <div className="flex items-center justify-start gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors"
          >
            {initialData ? "Salvar Alterações" : "Salvar Cliente"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 bg-transparent border border-gray-500 text-gray-800 font-bold rounded-md hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
