import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./features/customerSlice";
import addressReducer from "./features/addressSlice";
import equipmentReducer from "./features/equipmentSlice";
import serviceOrderReducer from "./features/serviceOrderSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      customer: customerReducer,
      address: addressReducer,
      equipment: equipmentReducer,
      serviceOrder: serviceOrderReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
