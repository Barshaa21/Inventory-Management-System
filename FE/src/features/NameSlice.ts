import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: "" };

export const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
      return state;
    },
  },
});
export const { setName } = nameSlice.actions;
export default nameSlice.reducer;
