import mongoose from "mongoose";
import { USER } from "../../user/model.js";
import { MESSAGE } from "./message.js";

const conversationSchema = new mongoose.Schema(
  {
    member: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER,
        require: true,
      },
    ],
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: MESSAGE,
      },
    ],
  },
  { timestamps: true }
);

export const CONVERSATION = mongoose.model("conversation", conversationSchema);
