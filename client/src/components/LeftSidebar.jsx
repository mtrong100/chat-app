import React, { useEffect, useState } from "react";
import UserChat, { UserChatSkeleton } from "./UserChat";
import useSWR from "swr";
import { fetcher } from "../utils/helper";
import useOnChange from "../hooks/useOnchange";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../context/auth-context";

const LeftSidebar = () => {
  const { currentUser } = useAuth();
  const { handleChange, value } = useOnChange();
  const { data, error, isLoading } = useSWR(
    `/api/chat/${currentUser?._id}`,
    fetcher
  );

  if (error) return null;
  return (
    <section className="border-r border-slate-600 px-3 py-5 overflow-y-auto sticky top-0 h-screen custom-scrollbar hidden xl:block">
      {/* <input
        type="text"
        value={value}
        placeholder="Search user..."
        onChange={handleChange}
        className="p-3 outline-none rounded-md  border-gray-500 border w-full bg-darkGraphite  focus:border-indigo-400"
      /> */}

      <div className="flex flex-col gap-2 ">
        {isLoading &&
          Array(6)
            .fill(0)
            .map(() => <UserChatSkeleton key={uuidv4()} />)}

        {!isLoading &&
          data.length > 0 &&
          data.map((item) => (
            <UserChat
              key={item._id}
              data={item}
              currentUserId={currentUser._id}
            />
          ))}
      </div>
    </section>
  );
};

export default LeftSidebar;
