import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAddress {
  id: number;
  street: string;
  number: string;
  complement?: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zipCode?: string | null;
  customerId: number;
}

interface AddressState {
  addresses: IAddress[];
  selectedAddress?: IAddress;
}

const initialState: AddressState = {
  addresses: [],
  selectedAddress: undefined,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddresses: (state, action: PayloadAction<IAddress[]>) => {
      state.addresses = action.payload;
      state.selectedAddress = undefined;
    },
    addAddress: (state, action: PayloadAction<IAddress>) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action: PayloadAction<IAddress>) => {
      const index = state.addresses.findIndex(
        (addr) => addr.id === action.payload.id
      );
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },
    removeAddress: (state, action: PayloadAction<number>) => {
      state.addresses = state.addresses.filter(
        (addr) => addr.id !== action.payload
      );
    },
    selectAddress: (state, action: PayloadAction<number>) => {
      state.selectedAddress = state.addresses.find(
        (addr) => addr.id === action.payload
      );
    },
    clearSelectedAddress: (state) => {
      state.selectedAddress = undefined;
    },
    clearAddressState: (state) => {
      state.addresses = [];
      state.selectedAddress = undefined;
    },
  },
});

export const {
  setAddresses,
  addAddress,
  updateAddress,
  removeAddress,
  selectAddress,
  clearSelectedAddress,
  clearAddressState,
} = addressSlice.actions;

export default addressSlice.reducer;
