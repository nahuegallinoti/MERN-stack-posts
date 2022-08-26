"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const router = (0, express_1.Router)();
router.post("/signup", user_controllers_1.signUp);
router.post("/signin", user_controllers_1.signIn);
router.get("/users", user_controllers_1.getUsers);
exports.default = router;
