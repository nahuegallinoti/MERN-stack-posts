import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/IUser";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  // uso this para poder acceder al user
  const user = this;

  if (!user.isModified("password")) return next();

  // string para cifrar la password cada vez que se guarde un usuario
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

// metodo para comparar contrasenas
userSchema.methods.comparePassword = async function (
  password: string
): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);
