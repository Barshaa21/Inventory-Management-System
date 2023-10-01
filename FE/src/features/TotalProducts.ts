import { createSlice } from "@reduxjs/toolkit";

// const initialState = { name: 0 };

export const TotalProductsSlice = createSlice({
  name: "count",
  initialState: { count: 0 },
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
      // return state;
    },
  },
});
export const { setCount } = TotalProductsSlice.actions;
export default TotalProductsSlice.reducer;
