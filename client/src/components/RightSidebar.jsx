import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { checkUserOnline, fetcher } from "../utils/helper";
import { AiOutlineMessage } from "react-icons/ai";
import { useAuth } from "../context/auth-context";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const RightSidebar = () => {
  const { currentUser } = useAuth();
  const { onlineUsers } = useSelector((state) => state.socket);
  const [users, setUsers] = useState([]);
  const { data, error, isLoading } = useSWR("/api/user/all", fetcher);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  // Search user
  const filteredUsers = users.filter((item) => item._id !== currentUser._id);

  if (error) return null;
  return (
    <section className="border-l border-slate-600 overflow-y-auto sticky top-0 h-screen custom-scrollbar">
      <div className="px-5 py-3">
        <h1 className="font-bold text-2xl ">Chat with users</h1>
        <p className="text-sm mt-1 font-medium opacity-80">
          Click on chat icon to start conversation with people
        </p>
      </div>

      <div className="flex flex-col gap-2 ">
        {isLoading && <div className="loading-circle"></div>}

        {!isLoading &&
          filteredUsers.length > 0 &&
          filteredUsers.map((item) => (
            <UserItem
              key={item._id}
              data={item}
              senderId={currentUser._id}
              onlineUsers={onlineUsers}
            />
          ))}
      </div>
    </section>
  );
};

export default RightSidebar;

function UserItem({ data, senderId, onlineUsers }) {
  const [isLoading, setIsLoading] = useState(false);
  const isOnline = checkUserOnline(onlineUsers, data?._id);

  const handleStartConversation = async (receiverId) => {
    if (!receiverId || !senderId) return;
    setIsLoading(true);

    try {
      const res = await axios.post("/api/chat/create", {
        receiverId,
        senderId,
      });
      const data = await res.data;
      if (!data) return;
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  };

  return (
    <div className="flex items-center justify-between h-14 hover:bg-white hover:bg-opacity-5 px-8">
      <div className="flex items-center gap-2">
        <img
          src="https://source.unsplash.com/random"
          alt="user-avatar"
          className="w-10 h-10 object-cover rounded-full flex-shrink-0"
        />
        <div>
          <h1 className="font-semibold text-white select-none">
            {data?.username}
          </h1>

          {isOnline && (
            <p className="text-sm font-medium text-green-500">Online</p>
          )}
        </div>
      </div>
      <span
        onClick={() => handleStartConversation(data._id)}
        className={`${
          isLoading ? "opacity-30" : "hover:text-indigo-300"
        } cursor-pointer `}
      >
        <AiOutlineMessage size={30} />
      </span>
    </div>
  );
}
