import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ServiceOrderStatus {
  open = "open",
  inProgress = "inProgress",
  completed = "completed",
  canceled = "canceled",
}

export interface IServiceOrder {
  id: number;
  description: string;
  status?: ServiceOrderStatus;
  estimate?: number;
  createdAt: string;
  customerId: number;
  items?: [];
}

interface serviceOrderState {
  serviceOrder: IServiceOrder[];
  selectedServiceOrder?: IServiceOrder;
}

const initialState: serviceOrderState = {
  serviceOrder: [],
};

export const serviceOrderSlice = createSlice({
  name: "serviceOrder",
  initialState,
  reducers: {
    setServiceOrders: (state, action: PayloadAction<IServiceOrder[]>) => {
      state.serviceOrder = action.payload;
    },
    addServiceOrder: (state, action: PayloadAction<IServiceOrder>) => {
      state.serviceOrder.push(action.payload);
    },
    updateServiceOrder: (state, action: PayloadAction<IServiceOrder>) => {
      const index = state.serviceOrder.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.serviceOrder[index] = action.payload;
      }
    },
    removeServiceOrder: (state, action: PayloadAction<number>) => {
      state.serviceOrder = state.serviceOrder.filter(
        (p) => p.id !== action.payload
      );
    },
    selectServiceOrder: (state, action: PayloadAction<number>) => {
      state.selectedServiceOrder = state.serviceOrder.find(
        (p) => p.id === action.payload
      );
    },
    clearSelectedServiceOrder: (state) => {
      state.selectedServiceOrder = undefined;
    },
  },
});

export const {
  setServiceOrders,
  addServiceOrder,
  updateServiceOrder,
  removeServiceOrder,
  selectServiceOrder,
  clearSelectedServiceOrder,
} = serviceOrderSlice.actions;

export default serviceOrderSlice.reducer;
