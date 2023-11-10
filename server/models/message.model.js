import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: { type: String },
    message: { type: String },
    senderId: { type: String },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
