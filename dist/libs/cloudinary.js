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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: "dg5b0ic1d",
    api_key: "149895869333266",
    api_secret: "qTxq4bru2iP5_K2n-HySqGyqVdo",
});
const uploadImage = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cloudinary_1.v2.uploader.upload(filePath, {
        folder: "Posts",
    });
});
exports.uploadImage = uploadImage;
const deleteImage = (public_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cloudinary_1.v2.uploader.destroy(public_id);
});
exports.deleteImage = deleteImage;
