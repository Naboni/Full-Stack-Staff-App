import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    staffs: (state, action) => {
      state.user = action.payload;
    },
    clear: (state) => {
      state.user = null;
    },
  },
});

export const { staffs, clear } = userSlice.actions;

export const selectUser = (state: any) => state.user.user;

export default userSlice.reducer;
