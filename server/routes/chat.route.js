import express from "express";
import {
  createChat,
  findChat,
  getUserChat,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/create", createChat);
router.get("/find/:id", findChat);
router.get("/:userId", getUserChat);

export default router;
