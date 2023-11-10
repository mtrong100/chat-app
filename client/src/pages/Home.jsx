import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { useAuth } from "../context/auth-context";
import useSWR from "swr";
import { fetcher } from "../utils/helper";
import { useChat } from "../context/chat-context";
import Message from "../components/Message";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { storeMessageValue, storeMessages } from "../redux/slices/globalSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { currentChat } = useChat();
  const { messages } = useSelector((state) => state.global);
  const { messageValue } = useSelector((state) => state.global);
  const { socket } = useSelector((state) => state.socket);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  const { data, error, isLoading } = useSWR(
    `/api/message/${currentChat?.chatId}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      dispatch(storeMessages(data));
    }
  }, [data, dispatch]);

  // Socket io - sendMessage
  useEffect(() => {
    if (socket === null) return;

    socket.emit("sendMessage", {
      ...arrivalMessage,
      receiverId: currentChat?.receiverId,
    });
  }, [arrivalMessage, currentChat?.receiverId, socket]);

  // Socket io - getMessage
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      if (currentChat?.chatId !== res.chatId) return;
      dispatch(storeMessages([...messages, res]));
    });

    return () => {
      socket.off("getMessage");
    };
  }, [currentChat?.chatId, dispatch, messages, socket]);

  /* Add new message */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageValue.trim() || !currentUser?._id || !currentChat?.chatId)
      return;

    const message = {
      message: messageValue,
      chatId: currentChat?.chatId,
      senderId: currentUser?._id,
    };

    try {
      const res = await axios.post("/api/message/create", message);
      const data = await res.data;

      setArrivalMessage(data);
      dispatch(storeMessages([...messages, data]));
      dispatch(storeMessageValue(""));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (error) return null;
  return (
    <div
      className={`${
        currentChat ? "" : "justify-center items-center"
      } w-full relative h-screen flex flex-col `}
    >
      {currentChat ? (
        <React.Fragment>
          <Header receiverId={currentChat?.receiverId} />
          <section className="p-5 flex-1 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
            {isLoading && <div className="loading-circle"></div>}

            {!isLoading &&
              messages &&
              messages.length > 0 &&
              messages.map((item) => (
                <div ref={scrollRef} key={item._id}>
                  <Message
                    data={item}
                    owner={item.senderId === currentUser._id}
                  />
                </div>
              ))}
          </section>

          <section className="sticky bottom-0 w-full px-2 py-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={messageValue}
                placeholder="Chat something...."
                onChange={(e) => dispatch(storeMessageValue(e.target.value))}
                className="p-3 outline-none  rounded-full  w-full bg-darkSaga border border-transparent focus:border-indigo-400"
              />
            </form>
          </section>
        </React.Fragment>
      ) : (
        <p className="text-3xl font-bold opacity-60">
          Open a conversation to chat with people
        </p>
      )}
    </div>
  );
};

export default Home;
