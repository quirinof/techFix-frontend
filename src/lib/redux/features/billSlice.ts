import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum PaymentMethod {
  cash = "cash",
  creditCard = "creditCard",
  debitCard = "debitCard",
  pix = "pix",
  boleto = "boleto",
}

export enum BillStatus {
  pending = "pending",
  paid = "paid",
  overdue = "overdue",
}

export interface IBill {
  id: number;
  amount: number;
  paymentMethod: PaymentMethod;
  dueDate: Date;
  status: BillStatus;
  serviceOrderId: number;
}

interface billState {
  bill: IBill[];
  selectedBill?: IBill;
}

const initialState: billState = {
  bill: [],
};

export const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    setBills: (state, action: PayloadAction<IBill[]>) => {
      state.bill = action.payload;
    },
    addBill: (state, action: PayloadAction<IBill>) => {
      state.bill.push(action.payload);
    },
    updateBill: (state, action: PayloadAction<IBill>) => {
      const index = state.bill.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.bill[index] = action.payload;
      }
    },
    removeBill: (state, action: PayloadAction<number>) => {
      state.bill = state.bill.filter((b) => b.id !== action.payload);
    },
    selectBill: (state, action: PayloadAction<number>) => {
      state.selectedBill = state.bill.find((b) => b.id === action.payload);
    },
    clearSelectedBill: (state) => {
      state.selectedBill = undefined;
    },
  },
});

export const {
  setBills,
  addBill,
  updateBill,
  removeBill,
  selectBill,
  clearSelectedBill,
} = billSlice.actions;

export default billSlice.reducer;
