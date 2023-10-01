import { createSlice } from "@reduxjs/toolkit";

const initialState = { theme: "hero-pattern" };

export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      return state;
    },
  },
});
export const { setTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
