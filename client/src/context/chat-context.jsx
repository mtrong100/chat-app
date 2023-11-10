import React, { createContext, useState, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./auth-context";
import { useDispatch, useSelector } from "react-redux";
import { storeOnlineUsers, storeSocket } from "../redux/slices/socketSlice";

const ENDPOINT = "chat-app-api-rust.vercel.app";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [currentChat, setCurrentChat] = useState(
    JSON.parse(localStorage.getItem("Chat")) || null
  );
  const { socket } = useSelector((state) => state.socket);

  // Fetch currentChat from localStorage
  useEffect(() => {
    localStorage.setItem("Chat", JSON.stringify(currentChat));
  }, [currentChat]);

  // Connect socket io for client
  useEffect(() => {
    const newSocket = io(ENDPOINT);
    dispatch(storeSocket(newSocket));

    return () => {
      newSocket.disconnect();
    };
  }, [dispatch]);

  // Socket io - Online users
  useEffect(() => {
    if (socket === null) return;

    socket.emit("addNewUser", currentUser?._id);
    socket.on("getOnlineUsers", (res) => {
      dispatch(storeOnlineUsers(res));
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [currentUser?._id, dispatch, socket]);

  const value = { currentChat, setCurrentChat };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

const useChat = () => {
  return useContext(ChatContext);
};

export { ChatProvider, useChat };
