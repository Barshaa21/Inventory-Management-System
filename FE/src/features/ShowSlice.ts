import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: "user" };

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // action data from the frontend
    // state alreday present in the global state
    setIsAdmin: (state, action) => {
      state.value = action.payload;
      return state;
    },
  },
});
export const { setIsAdmin } = adminSlice.actions;
export default adminSlice.reducer;
