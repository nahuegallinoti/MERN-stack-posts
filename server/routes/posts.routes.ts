import { Request, Router, Response } from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
} from "../controllers/posts.controllers";
import { check } from "express-validator";

const router = Router();

router.get("/posts", getPosts);

router.post(
  "/posts",
  [
    check("title").not().isEmpty().withMessage("Title required"),
    check("description").not().isEmpty().withMessage("Description required"),
  ],
  createPost
);

router.put("/posts/:id", updatePost);

router.delete("/posts/:id", deletePost);

router.get("/posts/:id", getPostById);

export default router;
