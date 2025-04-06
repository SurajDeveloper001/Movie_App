import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};
export const moveSlice = createSlice({
  name: "move",
  initialState,
  reducers: {
    loadmove: (state, action) => {
      state.info = action.payload;
    },

    removemove: (state, action) => {
      state.info = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadmove, removemove } = moveSlice.actions;

export default moveSlice.reducer;
