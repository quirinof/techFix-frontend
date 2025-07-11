import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum PaymentMethod {
  credit_card = "credit_card",
  debit_card = "debit_card",
  pix = "pix",
  cash = "cash",
  bank_slip = "bank_slip",
}

export enum BillStatus {
  pending = "pending",
  paid = "paid",
  overdue = "overdue",
}

export interface IBill {
  id: number;
  amount: number | string;
  paymentMethod: PaymentMethod;
  dueDate: string;
  status: BillStatus;
  serviceOrderId: number;
}

interface BillState {
  bills: IBill[];
  selectedBill?: IBill;
}

const initialState: BillState = {
  bills: [],
  selectedBill: undefined,
};

export const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    setBills: (state, action: PayloadAction<IBill[]>) => {
      state.bills = action.payload;
      state.selectedBill = undefined;
    },
    addBill: (state, action: PayloadAction<IBill>) => {
      state.bills.push(action.payload);
    },
    updateBill: (state, action: PayloadAction<IBill>) => {
      const index = state.bills.findIndex(
        (bill) => bill.id === action.payload.id
      );
      if (index !== -1) {
        state.bills[index] = action.payload;
      }
    },
    removeBill: (state, action: PayloadAction<number>) => {
      state.bills = state.bills.filter((bill) => bill.id !== action.payload);
    },
    selectBill: (state, action: PayloadAction<number>) => {
      state.selectedBill = state.bills.find(
        (bill) => bill.id === action.payload
      );
    },
    clearSelectedBill: (state) => {
      state.selectedBill = undefined;
    },
    clearBillState: (state) => {
      state.bills = [];
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
  clearBillState,
} = billSlice.actions;

export default billSlice.reducer;
