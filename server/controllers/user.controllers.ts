import { Request, Response } from "express";
import user from "../models/user";
import { IUser } from "../interfaces/IUser";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const createToken = async (user: IUser) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

export const signUp = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({
      error: "Email and password are required",
    });

  const result = await user.findOne({ email: req.body.email });

  if (result)
    return res.status(400).json({
      error: "The user already exists",
    });

  const userCreated = new user(req.body);

  await userCreated.save();

  return res.status(200).json({
    success: true,
    newUser: userCreated,
  });
};

export const signIn = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({
      error: "Email and password are required",
    });

  const userResult = await user.findOne({ email: req.body.email });

  if (!userResult)
    return res.status(400).json({
      error: "The user doesn't exist",
    });

  const isMatch = await userResult.comparePassword(req.body.password);

  if (isMatch)
    return res.status(200).json({ token: await createToken(userResult) });

  return res.status(400).json({
    error: "Incorrect email or password",
  });
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await user.find();

  if (!users)
    return res.status(400).json({
      error: "No users found",
    });

  return res.send(users);
};
