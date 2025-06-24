import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum DocumentType {
  cpf = "cpf",
  rg = "rg",
  cnh = "cnh",
  passaporte = "passaporte",
  cnpj = "cnpj",
}

export interface ICustomer {
  id: number;
  name: string;
  document?: string;
  documentType?: DocumentType;
  phone?: string;
  email?: string;
  equipment?: [];
  addresses?: [];
  createdAt: string;
}

interface customerState {
  customer: ICustomer[];
  selectedcustomer?: ICustomer;
}

const initialState: customerState = {
  customer: [],
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setcustomer: (state, action: PayloadAction<ICustomer[]>) => {
      state.customer = action.payload;
    },
    addcustomer: (state, action: PayloadAction<ICustomer>) => {
      state.customer.push(action.payload);
    },
    updatecustomer: (state, action: PayloadAction<ICustomer>) => {
      const index = state.customer.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.customer[index] = action.payload;
      }
    },
    removecustomer: (state, action: PayloadAction<number>) => {
      state.customer = state.customer.filter((p) => p.id !== action.payload);
    },
    selectcustomer: (state, action: PayloadAction<number>) => {
      state.selectedcustomer = state.customer.find(
        (p) => p.id === action.payload
      );
    },
    clearSelectedcustomer: (state) => {
      state.selectedcustomer = undefined;
    },
  },
});

export const {
  setcustomer,
  addcustomer,
  updatecustomer,
  removecustomer,
  selectcustomer,
  clearSelectedcustomer,
} = customerSlice.actions;

export default customerSlice.reducer;
