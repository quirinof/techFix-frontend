import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum DeviceType {
  notebook = "notebook",
  smartphone = "smartphone",
  tablet = "tablet",
  desktop = "desktop",
  other = "other",
}

export interface IEquipment {
  id: number;
  deviceType: DeviceType;
  brand?: string | null;
  model?: string | null;
  serialNumber?: string | null;
  customerId: number;
  createdAt: string;
}

interface EquipmentState {
  equipments: IEquipment[];
  selectedEquipment?: IEquipment;
}

const initialState: EquipmentState = {
  equipments: [],
  selectedEquipment: undefined,
};

export const equipmentSlice = createSlice({
  name: "equipment",
  initialState,
  reducers: {
    setEquipments: (state, action: PayloadAction<IEquipment[]>) => {
      state.equipments = action.payload;
      state.selectedEquipment = undefined;
    },
    addEquipment: (state, action: PayloadAction<IEquipment>) => {
      state.equipments.push(action.payload);
    },
    updateEquipment: (state, action: PayloadAction<IEquipment>) => {
      const index = state.equipments.findIndex(
        (eq) => eq.id === action.payload.id
      );
      if (index !== -1) {
        state.equipments[index] = action.payload;
      }
    },
    removeEquipment: (state, action: PayloadAction<number>) => {
      state.equipments = state.equipments.filter(
        (eq) => eq.id !== action.payload
      );
    },
    selectEquipment: (state, action: PayloadAction<number>) => {
      state.selectedEquipment = state.equipments.find(
        (eq) => eq.id === action.payload
      );
    },
    clearSelectedEquipment: (state) => {
      state.selectedEquipment = undefined;
    },
    clearEquipmentState: (state) => {
      state.equipments = [];
      state.selectedEquipment = undefined;
    },
  },
});

export const {
  setEquipments,
  addEquipment,
  updateEquipment,
  removeEquipment,
  selectEquipment,
  clearSelectedEquipment,
  clearEquipmentState,
} = equipmentSlice.actions;

export default equipmentSlice.reducer;
