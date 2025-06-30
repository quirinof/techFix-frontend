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
  serviceOrders: IServiceOrder[];
  selectedServiceOrder?: IServiceOrder;
}

const initialState: serviceOrderState = {
  serviceOrders: [],
};

export const serviceOrderSlice = createSlice({
  name: "serviceOrder",
  initialState,
  reducers: {
    setServiceOrders: (state, action: PayloadAction<IServiceOrder[]>) => {
      state.serviceOrders = action.payload;
    },
    addServiceOrder: (state, action: PayloadAction<IServiceOrder>) => {
      state.serviceOrders.push(action.payload);
    },
    updateServiceOrder: (state, action: PayloadAction<IServiceOrder>) => {
      const index = state.serviceOrders.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.serviceOrders[index] = action.payload;
      }
    },
    removeServiceOrder: (state, action: PayloadAction<number>) => {
      state.serviceOrders = state.serviceOrders.filter(
        (p) => p.id !== action.payload
      );
    },
    selectServiceOrder: (state, action: PayloadAction<number>) => {
      state.selectedServiceOrder = state.serviceOrders.find(
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
