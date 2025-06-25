import { IAddress } from "@/lib/redux/features/addressSlice";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type AddressFormData = Omit<IAddress, "id">;

interface AddressFormProps {
  initialData?: IAddress;
  onSubmit: (data: AddressFormData, id?: number) => void;
  onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    defaultValues: {
      street: undefined,
      number: undefined,
      complement: undefined,
      neighborhood: undefined,
      city: undefined,
      state: undefined,
      zipCode: undefined,
      customerId: undefined,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        street: undefined,
        number: undefined,
        complement: undefined,
        neighborhood: undefined,
        city: undefined,
        state: undefined,
        zipCode: undefined,
        customerId: undefined,
      });
    }
  }, [initialData, reset]);

  const onFormSubmit: SubmitHandler<AddressFormData> = (data) => {
    onSubmit(data, initialData?.id);
  };

  const baseInputClasses =
    "w-full px-4 py-2 bg-white border border-gray-400 text-gray-900 placeholder:text-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition";
  const errorInputClasses = "border-red-600 focus:ring-red-600";

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 border-b border-gray-200 pb-4 mb-8">
        {initialData ? "Editar Endereço" : "Novo Endereço"}
      </h1>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col gap-6"
        noValidate
      >
        <div>
          <label
            htmlFor="street"
            className="block text-base font-semibold text-gray-900 mb-2"
          >
            Rua / Logradouro
          </label>
          <input
            id="street"
            type="text"
            {...register("street", {
              required: "O nome da rua é obrigatório.",
            })}
            className={`${baseInputClasses} ${
              errors.street ? errorInputClasses : ""
            }`}
            placeholder="Ex: Rua das Flores"
          />
          {errors.street && (
            <p className="font-medium text-red-600 text-sm mt-2">
              {errors.street.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="number"
              className="block text-base font-semibold text-gray-900 mb-2"
            >
              Número
            </label>
            <input
              id="number"
              type="text"
              {...register("number", { required: "O número é obrigatório." })}
              className={`${baseInputClasses} ${
                errors.number ? errorInputClasses : ""
              }`}
              placeholder="Ex: 123"
            />
            {errors.number && (
              <p className="font-medium text-red-600 text-sm mt-2">
                {errors.number.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="complement"
              className="block text-base font-semibold text-gray-900 mb-2"
            >
              Complemento
            </label>
            <input
              id="complement"
              type="text"
              {...register("complement")}
              className={baseInputClasses}
              placeholder="Ex: Apto 404"
            />
          </div>

          <div>
            <label
              htmlFor="zipCode"
              className="block text-base font-semibold text-gray-900 mb-2"
            >
              CEP
            </label>
            <input
              id="zipCode"
              type="text"
              {...register("zipCode", {
                minLength: {
                  value: 8,
                  message: "O CEP deve ter no mínimo 8 caracteres.",
                },
              })}
              className={baseInputClasses}
              placeholder="Apenas números"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="neighborhood"
              className="block text-base font-semibold text-gray-900 mb-2"
            >
              Bairro
            </label>
            <input
              id="neighborhood"
              type="text"
              {...register("neighborhood", {
                required: "O bairro é obrigatório.",
              })}
              className={`${baseInputClasses} ${
                errors.neighborhood ? errorInputClasses : ""
              }`}
              placeholder="Ex: Centro"
            />
            {errors.neighborhood && (
              <p className="font-medium text-red-600 text-sm mt-2">
                {errors.neighborhood.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-base font-semibold text-gray-900 mb-2"
            >
              Cidade
            </label>
            <input
              id="city"
              type="text"
              {...register("city", { required: "A cidade é obrigatória." })}
              className={`${baseInputClasses} ${
                errors.city ? errorInputClasses : ""
              }`}
              placeholder="Ex: São Paulo"
            />
            {errors.city && (
              <p className="font-medium text-red-600 text-sm mt-2">
                {errors.city.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-base font-semibold text-gray-900 mb-2"
            >
              Estado
            </label>
            <select
              id="state"
              {...register("state", {
                required: "Por favor, selecione um estado.",
              })}
              className={`${baseInputClasses} ${
                errors.state ? errorInputClasses : ""
              }`}
              defaultValue=""
            >
              <option value="" disabled>
                Selecione um estado
              </option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
            {errors.state && (
              <p className="font-medium text-red-600 text-sm mt-2">
                {errors.state.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-6 py-2.5 cursor-pointer bg-blue-600 shadow-2xs hover:shadow-lg hover:shadow-blue-500/50 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-300"
          >
            {initialData ? "Salvar Alterações" : "Salvar Endereço"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 cursor-pointer bg-transparent border border-gray-500 text-gray-800 font-bold rounded-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
