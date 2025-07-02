import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ServiceOrderItemStatus {
  PENDING = "pending",
  EXECUTING = "executing",
  COMPLETED = "completed",
}

export interface IServiceOrderItem {
  id: number;
  description?: string | null;
  status?: ServiceOrderItemStatus | null;
  equipmentId: number;
  serviceOrderId: number;
}

interface ServiceOrderItemState {
  serviceOrderItems: IServiceOrderItem[];
  selectedServiceOrderItem?: IServiceOrderItem;
}

const initialState: ServiceOrderItemState = {
  serviceOrderItems: [],
  selectedServiceOrderItem: undefined,
};

export const serviceOrderItemSlice = createSlice({
  name: "serviceOrderItem",
  initialState,
  reducers: {
    setServiceOrderItems: (
      state,
      action: PayloadAction<IServiceOrderItem[]>
    ) => {
      state.serviceOrderItems = action.payload;
      state.selectedServiceOrderItem = undefined;
    },
    addServiceOrderItem: (state, action: PayloadAction<IServiceOrderItem>) => {
      state.serviceOrderItems.push(action.payload);
    },
    updateServiceOrderItem: (
      state,
      action: PayloadAction<IServiceOrderItem>
    ) => {
      const index = state.serviceOrderItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.serviceOrderItems[index] = action.payload;
      }
    },
    removeServiceOrderItem: (state, action: PayloadAction<number>) => {
      state.serviceOrderItems = state.serviceOrderItems.filter(
        (item) => item.id !== action.payload
      );
    },
    selectServiceOrderItem: (state, action: PayloadAction<number>) => {
      state.selectedServiceOrderItem = state.serviceOrderItems.find(
        (item) => item.id === action.payload
      );
    },
    clearSelectedServiceOrderItem: (state) => {
      state.selectedServiceOrderItem = undefined;
    },
    clearServiceOrderItemState: (state) => {
      state.serviceOrderItems = [];
      state.selectedServiceOrderItem = undefined;
    },
  },
});

export const {
  setServiceOrderItems,
  addServiceOrderItem,
  updateServiceOrderItem,
  removeServiceOrderItem,
  selectServiceOrderItem,
  clearSelectedServiceOrderItem,
  clearServiceOrderItemState,
} = serviceOrderItemSlice.actions;

export default serviceOrderItemSlice.reducer;
