// reducer
import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "../features/ShowSlice";
import nameSlice from "../features/NameSlice";
import TotalProductsSlice from "../features/TotalProducts";
import ThemeSlice from "../features/Theme";

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    name: nameSlice,
    count: TotalProductsSlice,
    theme: ThemeSlice,
  },
});
