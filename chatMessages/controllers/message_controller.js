import { MESSAGE } from "../model/message.js";
import { CONVERSATION } from "../model/conversation.js";
import { getReciverSocketId, io } from "../../socketIo/server.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const senderId = req.user;
    const {id: reciverId} = req.params;
    let conversation = await CONVERSATION.findOne({
      member: { $all: [senderId, reciverId] },
    });

    if (!conversation) {
      conversation = await CONVERSATION.create({
        member: [senderId, reciverId],
      });
    }

    const newMessage = new MESSAGE({
      senderId,
      reciverId,
      message,
    });

    if (newMessage) {
      conversation.message.push(newMessage);
    }

    await Promise.all([conversation.save(), newMessage.save()]);
    const reciverSocketId = getReciverSocketId(reciverId)
    if(reciverSocketId){
      io.to(reciverSocketId).emit("newMessage", newMessage)
    }
    return res
      .status(201)
      .json({ msg: "message send successfully", newMessage });
  } catch (error) {
    console.log(error);
  }
};

export const reciveMessage = async (req, res) => {
  try {
    const reciverId = req.params.reciverId;
    const senderid = req.user;
   
    let conversation = await CONVERSATION.findOne({
      member: { $all: [senderid , reciverId] },
    }).populate("message");
    if (!conversation) {
      return res.status(201).json([]);
    }
   
    const message = conversation.message;
    return res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
