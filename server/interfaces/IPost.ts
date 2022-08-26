import { Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  description: string;
  image?: {
    url: string;
    public_id: string;
  };
}
