import mongoose from "mongoose";

let chatSchema = new mongoose.Schema(
  {
    botid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bot",
      required: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chatclientid: {
      type: String,
      trim: true,
    },
    sender: {
      type: String,
      enum: ["user", "bot"],
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    meta: {
      type: Object,
      default: {
        modelUsed: null,
        tokensUsed: 0,
        isFlagged: false,
        promptFragment: null,
        feedback: null,
      },
    },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);
