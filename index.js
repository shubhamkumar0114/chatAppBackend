import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"
dotenv.config();
import { app, io, server } from "./socketIo/server.js";


// user router
import userRouter from "./user/router.js";
import messageRouter from "./chatMessages/router/message_router.js";

const port = process.env.port;

// mongodb connection
try {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("connect mongodb");
} catch (error) {
  console.log(error);
}

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

// ---------------------------------------------
// if(process.env.NODE_ENV === "production"){
//   const dirPath = path.resolve();

//   app.use(express.static("./frontend/dist"))
//   app.get("*", (req,res)=>{
//     res.sendFile(path.resolve(dirPath , "./frontend/dist", "index.html"))
//   })
// }


// all routes
app.use("/user", userRouter);
app.use("/message", messageRouter);
server.listen(port, () => console.log(`server running on ${port}`));
