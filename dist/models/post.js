"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: {
        url: { type: String },
        public_id: { type: String },
    },
});
exports.default = (0, mongoose_1.model)("Post", postSchema);
