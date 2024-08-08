import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      fetchUserStart(state) {
        state.loading = true;
        state.error = null;
      },
      fetchUserSuccess(state, action) {
        state.loading = false;
        state.data = action.payload;
      },
      fetchUserFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
      },
      clearUser(state) {
        state.data = null;
        state.loading = false;
        state.error = null;
      }
    }
})

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure, clearUser } = userSlice.actions;

export default userSlice.reducer;
