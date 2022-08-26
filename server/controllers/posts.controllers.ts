import Post from "../models/post";
import { uploadImage, deleteImage } from "../libs/cloudinary";
import fs from "fs-extra";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const getPosts = async (req: Request, res: Response): Promise<any> => {
  try {
    const posts = await Post.find();
    return res.send(posts);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req: any, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const { title, description } = req.body;
    let image;

    if (req.files?.image) {
      let imagePass = req.files.image;

      const result = await uploadImage(imagePass.tempFilePath);
      await fs.remove(imagePass.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const newPost = new Post({ title, description, image });

    await newPost.save();

    return res.json(newPost);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.send(updatedPost);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete({ _id: req.params.id });

    if (!post) return res.sendStatus(404);

    if (post.image?.public_id) await deleteImage(post.image.public_id);

    return res.sendStatus(204);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.sendStatus(404);

    return res.json(post);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
