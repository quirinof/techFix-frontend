import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./features/customerSlice";
import addressReducer from "./features/addressSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      customer: customerReducer,
      address: addressReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
