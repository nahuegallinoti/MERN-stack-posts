"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_controllers_1 = require("../controllers/posts.controllers");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get("/posts", posts_controllers_1.getPosts);
router.post("/posts", [
    (0, express_validator_1.check)("title").not().isEmpty().withMessage("Title required"),
    (0, express_validator_1.check)("description").not().isEmpty().withMessage("Description required"),
], posts_controllers_1.createPost);
router.put("/posts/:id", posts_controllers_1.updatePost);
router.delete("/posts/:id", posts_controllers_1.deletePost);
router.get("/posts/:id", posts_controllers_1.getPostById);
exports.default = router;
