import React from "react";
import { LuAlertCircle } from "react-icons/lu";
import { IoIosCall } from "react-icons/io";
import { BiSolidVideo } from "react-icons/bi";
import useSWR from "swr";
import { checkUserOnline, fetcher } from "../utils/helper";
import { useSelector } from "react-redux";

const Header = ({ receiverId }) => {
  const { onlineUsers } = useSelector((state) => state.socket);
  const isOnline = checkUserOnline(onlineUsers, receiverId);
  const { data, error, isLoading } = useSWR(
    `/api/user/find/${receiverId}`,
    fetcher
  );

  if (error) return null;
  return (
    <header className=" bg-darkGraphite p-3 sticky top-0 flex items-center justify-between w-full px-10">
      <div className="flex items-center gap-3">
        <img
          src="https://source.unsplash.com/random"
          alt="user-avatar"
          className="w-8 h-8 object-cover rounded-full flex-shrink-0"
        />

        <div>
          <h1 className="font-medium text-white">
            {isLoading ? "Loading..." : data?.username}
          </h1>
          {isOnline && (
            <p className="text-xs text-green-500 font-medium">Online</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <LuAlertCircle size={20} />
        <IoIosCall size={20} />
        <BiSolidVideo size={20} />
      </div>
    </header>
  );
};

export default Header;
