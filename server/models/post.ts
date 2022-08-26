import { Schema, model } from "mongoose";
import { IPost } from "../interfaces/IPost";

const postSchema = new Schema<IPost>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  image: {
    url: { type: String },
    public_id: { type: String },
  },
});

export default model<IPost>("Post", postSchema);
