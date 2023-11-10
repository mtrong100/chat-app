import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    currentChat: null,
    receiverId: null,
    messageValue: "",
    messages: [],
    newMessage: null,
  },
  reducers: {
    storeCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    storeReceiverId: (state, action) => {
      state.receiverId = action.payload;
    },
    storeMessageValue: (state, action) => {
      state.messageValue = action.payload;
    },
    storeMessages: (state, action) => {
      state.messages = action.payload;
    },
    storeNewMessage: (state, action) => {
      state.newMessage = action.payload;
    },
  },
});

export const {
  storeCurrentChat,
  storeReceiverId,
  storeMessageValue,
  storeMessages,
  storeNewMessage,
} = globalSlice.actions;

export default globalSlice.reducer;
