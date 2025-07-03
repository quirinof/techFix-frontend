import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./features/customerSlice";
import addressReducer from "./features/addressSlice";
import equipmentReducer from "./features/equipmentSlice";
import serviceOrderReducer from "./features/serviceOrderSlice";
import serviceOrderItemReducer from "./features/serviceOrderItemSlice";
import serviceBillReducer from "./features/billSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      customer: customerReducer,
      address: addressReducer,
      equipment: equipmentReducer,
      serviceOrder: serviceOrderReducer,
      serviceOrderItem: serviceOrderItemReducer,
      bill: serviceBillReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
