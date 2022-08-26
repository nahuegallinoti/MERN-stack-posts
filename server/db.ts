import mongoose from "mongoose";
import { MONGO_URI } from "./config";

export async function connectDB() {
  try {
    const db = await mongoose.connect(MONGO_URI);

    mongoose.connection.on("error", (err: any) => {
      console.log(err);
      process.exit(0);
    });

    console.log(`Connected to database ${db.connection.name}`);
  } catch (e) {
    console.error(e);
  }
}
