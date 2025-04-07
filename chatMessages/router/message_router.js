import express from "express"
import { reciveMessage, sendMessage } from "../controllers/message_controller.js";
import { userMiddleWare } from "../../user/AuthorizedUser/AuthUser.js";

const router = express.Router();

router.post("/send/:id" ,userMiddleWare, sendMessage)
router.get("/recive/:reciverId",userMiddleWare , reciveMessage)

export default router;