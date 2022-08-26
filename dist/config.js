"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.MONGO_URI = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT || 4000;
exports.MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test";
exports.JWT_SECRET = process.env.JWT_SECRET || "somesecrettoken";
