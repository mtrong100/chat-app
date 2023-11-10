import { createSlice } from "@reduxjs/toolkit";

export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
    onlineUsers: [],
  },
  reducers: {
    storeSocket: (state, action) => {
      state.socket = action.payload;
    },
    storeOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { storeSocket, storeOnlineUsers } = socketSlice.actions;

export default socketSlice.reducer;
