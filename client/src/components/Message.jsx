import React from "react";
import { format } from "timeago.js";

const Message = ({ data, owner }) => {
  if (owner) {
    return (
      <div className="flex flex-col items-end gap-2 justify-end">
        <div className="flex items-start gap-2">
          <div className="flex flex-col items-end">
            <p className="py-2 px-4 bg-indigo-600 rounded-full">
              {data?.message}
            </p>
            <small className="opacity-80">{format(data?.createdAt)}</small>
          </div>
          <img
            src="https://source.unsplash.com/random"
            alt="user-avatar"
            className="w-10 h-10 object-cover rounded-full flex-shrink-0"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2 justify-start">
      <div className="flex items-start gap-2">
        <img
          src="https://source.unsplash.com/random"
          alt="user-avatar"
          className="w-10 h-10 object-cover rounded-full flex-shrink-0"
        />

        <div className="flex flex-col items-start">
          <p className="py-2 px-4  bg-darkSaga rounded-full">{data?.message}</p>
          <small className="opacity-80">{format(data?.createdAt)}</small>
        </div>
      </div>
    </div>
  );
};

export default Message;
