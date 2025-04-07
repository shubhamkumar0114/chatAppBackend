import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
    },
    reciverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
    },
    message: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const MESSAGE = mongoose.model("message", messageSchema);
