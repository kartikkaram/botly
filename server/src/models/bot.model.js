import mongoose from "mongoose";

let botSchema = new mongoose.Schema(
  {
    ownerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    botname: {
      type: String,
      required: true,
      trim: true,
    },
    bottype: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      default: "English",
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    targetaudience: {
      type: String,
      required: true,
      trim: true,
    },
    responsestyle: {
      type: String,
      required: true,
      trim: true,
    },
    capabilities: {
      type: [String],
      required: true,
    },
    restrictedtopics: {
      type: [String],
      default: [],
    },
    websitecontext: [
  {
    input: { type: String, required: true, trim: true },
    output: { type: String, required: true, trim: true },
    embedding: {
      type: [[Number]],
     required: true,
    }
  }
] ,
    websiteurl: {
      type: String,
      required: true,
      trim: true,
    },
    prompt: {
      type: String,
      required:true,
      default: "",
    },
  },
  { timestamps: true }
);

export const Bot = mongoose.model("Bot", botSchema);
