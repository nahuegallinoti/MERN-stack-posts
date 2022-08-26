import { Router } from "express";
import { signUp, signIn, getUsers } from "../controllers/user.controllers";

const router = Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.get("/users", getUsers);

export default router;
