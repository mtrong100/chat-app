import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json("User not found!");
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const searchUser = async (req, res) => {
  const { username } = req.query;

  try {
    const users = await User.find({
      username: { $regex: username, $options: "i" },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
