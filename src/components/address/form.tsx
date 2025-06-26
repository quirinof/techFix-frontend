import { IAddress } from "@/lib/redux/features/addressSlice";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Home,
  MapPin,
  Building,
  Hash,
  Package,
  Navigation,
  Save,
  X,
} from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {initialData ? "Editar Endereço" : "Novo Endereço"}
          </h1>
          <p className="text-gray-600">
            {initialData
              ? "Atualize as informações do endereço selecionado"
              : "Preencha os dados para cadastrar um novo endereço"}
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
                    htmlFor="street"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                  >
                    <Home className="w-4 h-4 text-gray-500" />
                    Rua / Logradouro
                  </label>
                  <input
                    id="street"
                    type="text"
                    {...register("street", {
                      required: "O nome da rua é obrigatório.",
                    })}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white transition-all duration-200 ${
                      errors.street
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    }`}
                    placeholder="Ex: Rua das Flores"
                  />
                  {errors.street && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {errors.street.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="number"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                    >
                      <Hash className="w-4 h-4 text-gray-500" />
                      Número
                    </label>
                    <input
                      id="number"
                      type="text"
                      {...register("number", {
                        required: "O número é obrigatório.",
                      })}
                      className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white transition-all duration-200 ${
                        errors.number
                          ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                          : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      }`}
                      placeholder="Ex: 123"
                    />
                    {errors.number && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                        <X className="w-4 h-4" />
                        {errors.number.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="complement"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                    >
                      <Package className="w-4 h-4 text-gray-500" />
                      Complemento
                    </label>
                    <input
                      id="complement"
                      type="text"
                      {...register("complement")}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      placeholder="Ex: Apto 404"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="zipCode"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                    >
                      <Navigation className="w-4 h-4 text-gray-500" />
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
                      className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white transition-all duration-200 ${
                        errors.zipCode
                          ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                          : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      }`}
                      placeholder="00000-000"
                    />
                    {errors.zipCode && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                        <X className="w-4 h-4" />
                        {errors.zipCode.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="neighborhood"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                    >
                      <Building className="w-4 h-4 text-gray-500" />
                      Bairro
                    </label>
                    <input
                      id="neighborhood"
                      type="text"
                      {...register("neighborhood", {
                        required: "O bairro é obrigatório.",
                      })}
                      className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white transition-all duration-200 ${
                        errors.neighborhood
                          ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                          : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      }`}
                      placeholder="Ex: Centro"
                    />
                    {errors.neighborhood && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                        <X className="w-4 h-4" />
                        {errors.neighborhood.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                    >
                      <MapPin className="w-4 h-4 text-gray-500" />
                      Cidade
                    </label>
                    <input
                      id="city"
                      type="text"
                      {...register("city", {
                        required: "A cidade é obrigatória.",
                      })}
                      className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white transition-all duration-200 ${
                        errors.city
                          ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                          : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      }`}
                      placeholder="Ex: São Paulo"
                    />
                    {errors.city && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                        <X className="w-4 h-4" />
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3"
                    >
                      <Navigation className="w-4 h-4 text-gray-500" />
                      Estado
                    </label>
                    <select
                      id="state"
                      {...register("state", {
                        required: "Por favor, selecione um estado.",
                      })}
                      className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 focus:outline-none focus:bg-white transition-all duration-200 ${
                        errors.state
                          ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                          : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                        <X className="w-4 h-4" />
                        {errors.state.message}
                      </p>
                    )}
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
                  {initialData ? "Salvar Alterações" : "Salvar Endereço"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
