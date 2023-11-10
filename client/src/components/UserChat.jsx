import React, { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import axios from "axios";
import { useChat } from "../context/chat-context";

const UserChat = ({ data, currentUserId }) => {
  const { members } = data;
  const [user, setUser] = useState(null);
  const { setCurrentChat } = useChat();
  const friendId = members?.find((item) => item !== currentUserId);

  // Fetch user profile
  useEffect(() => {
    async function getUserProfile() {
      if (!friendId) return;

      try {
        const res = await axios.get(`/api/user/find/${friendId}`);
        const data = await res.data;
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    }
    getUserProfile();
  }, [friendId]);

  // Choose chat
  const handleChooseChat = (values) => {
    if (!values) return;
    const { members, _id } = values;
    const receiverId = members?.find((item) => item !== currentUserId);
    const senderId = members?.find((item) => item === currentUserId);

    const data = {
      senderId,
      receiverId,
      chatId: _id,
    };

    setCurrentChat(data);
    localStorage.setItem("Chat", JSON.stringify(data));
  };

  return (
    <div
      onClick={() => handleChooseChat(data)}
      className="flex items-center justify-between relative p-3 hover:bg-white hover:bg-opacity-5 cursor-pointer rounded-md"
    >
      <div className="flex items-center gap-2">
        <img
          src="https://source.unsplash.com/random"
          alt="user-avatar"
          className="w-10 h-10 object-cover rounded-full flex-shrink-0"
        />
        <div>
          <h1 className="font-bold text-white">{user?.username}</h1>
          <p className="opacity-80">Lorem ipsum, dolor sit amet...</p>
        </div>
      </div>

      <span className="absolute w-3 h-3 bg-indigo-400 rounded-full top-2 right-2"></span>
      <span className="opacity-80 text-sm">Today at 11:03 AM</span>
    </div>
  );
};

export default UserChat;

export function UserChatSkeleton() {
  return (
    <div className="flex items-center justify-between relative p-3  cursor-pointer rounded-md">
      <div className="flex items-start gap-2 w-full">
        <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
        <div className="w-full">
          <Skeleton className="w-[150px] h-[25px] rounded-sm" />
          <Skeleton className="w-full h-[25px] rounded-md mt-1" />
        </div>
      </div>
    </div>
  );
}
