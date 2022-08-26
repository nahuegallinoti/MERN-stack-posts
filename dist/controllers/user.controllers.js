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
exports.getUsers = exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const createToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
    }, config_1.JWT_SECRET, {
        expiresIn: "1h",
    });
});
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password)
        return res.status(400).json({
            error: "Email and password are required",
        });
    const result = yield user_1.default.findOne({ email: req.body.email });
    if (result)
        return res.status(400).json({
            error: "The user already exists",
        });
    const userCreated = new user_1.default(req.body);
    yield userCreated.save();
    return res.status(200).json({
        success: true,
        newUser: userCreated,
    });
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password)
        return res.status(400).json({
            error: "Email and password are required",
        });
    const userResult = yield user_1.default.findOne({ email: req.body.email });
    if (!userResult)
        return res.status(400).json({
            error: "The user doesn't exist",
        });
    const isMatch = yield userResult.comparePassword(req.body.password);
    if (isMatch)
        return res.status(200).json({ token: yield createToken(userResult) });
    return res.status(400).json({
        error: "Incorrect email or password",
    });
});
exports.signIn = signIn;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find();
    if (!users)
        return res.status(400).json({
            error: "No users found",
        });
    return res.send(users);
});
exports.getUsers = getUsers;
