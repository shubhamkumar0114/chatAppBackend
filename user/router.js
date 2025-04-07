import express from "express";
import { signup, login, logout, getAllUser } from "./controller.js";
import { userMiddleWare } from "./AuthorizedUser/AuthUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/alluser", userMiddleWare, getAllUser);

 
export default router;
