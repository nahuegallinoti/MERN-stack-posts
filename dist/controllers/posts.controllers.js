"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostById = exports.deletePost = exports.updatePost = exports.createPost = exports.getPosts = void 0;
const post_1 = __importDefault(require("../models/post"));
const cloudinary_1 = require("../libs/cloudinary");
const fs_extra_1 = __importDefault(require("fs-extra"));
const express_validator_1 = require("express-validator");
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.default.find();
        return res.send(posts);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getPosts = getPosts;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(422).json(errors.array());
        const { title, description } = req.body;
        let image;
        if ((_a = req.files) === null || _a === void 0 ? void 0 : _a.image) {
            let imagePass = req.files.image;
            const result = yield (0, cloudinary_1.uploadImage)(imagePass.tempFilePath);
            yield fs_extra_1.default.remove(imagePass.tempFilePath);
            image = {
                url: result.secure_url,
                public_id: result.public_id,
            };
        }
        const newPost = new post_1.default({ title, description, image });
        yield newPost.save();
        return res.json(newPost);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield post_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        return res.send(updatedPost);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const post = yield post_1.default.findByIdAndDelete({ _id: req.params.id });
        if (!post)
            return res.sendStatus(404);
        if ((_b = post.image) === null || _b === void 0 ? void 0 : _b.public_id)
            yield (0, cloudinary_1.deleteImage)(post.image.public_id);
        return res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deletePost = deletePost;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_1.default.findById(req.params.id);
        if (!post)
            return res.sendStatus(404);
        return res.json(post);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getPostById = getPostById;
