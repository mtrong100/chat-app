import Chat from "../models/chat.model.js";

export const createChat = async (req, res) => {
  const { receiverId, senderId } = req.body;

  try {
    const chat = await Chat.findOne({
      members: { $all: [receiverId, senderId] },
    });

    if (chat) {
      return res.status(200).json(chat);
    }

    const newChat = await Chat({ members: [receiverId, senderId] });
    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserChat = async (req, res) => {
  const { userId } = req.params;

  try {
    const chat = await Chat.find({
      members: { $in: [userId] },
    });

    if (!chat) {
      return res.status(404).json("Chat not found!");
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json("Chat not found!");
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
