import Message from "../models/message.model.js";

export const createMessage = async (req, res) => {
  const { chatId, senderId, message } = req.body;

  try {
    const newMessage = await Message({ chatId, senderId, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMessage = async (req, res) => {
  const { chatId } = req.params;

  try {
    const message = await Message.find({ chatId });

    if (!message) {
      return res.status(404).json("Message not found!");
    }

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
};
