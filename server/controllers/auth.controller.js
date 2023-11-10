import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const isExistedUser = await User.findOne({ email: req.body.email });
    if (isExistedUser) {
      return res
        .status(400)
        .json("This email is already existed, please use another one!");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hashPassword });
    await newUser.save();

    const tokenExpirationTime = 30 * 24 * 60 * 60 * 1000;
    const token = jwt.sign({ id: newUser._id }, process.env.JWT, {
      expiresIn: "30d",
    });
    const { password, ...rest } = newUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + tokenExpirationTime),
      })
      .status(201)
      .json(rest);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found!");
    }

    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json("Wrong password!");
    }

    const tokenExpirationTime = 30 * 24 * 60 * 60 * 1000;
    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "30d",
    });
    const { password, ...rest } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + tokenExpirationTime),
      })
      .status(201)
      .json(rest);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    res.status(500).json(error);
  }
};
