import express from "express";
import {
  getAllUsers,
  getUserById,
  searchUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/find/:id", getUserById);
router.get("/search", searchUser);

export default router;
