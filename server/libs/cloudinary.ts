import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dg5b0ic1d",
  api_key: "149895869333266",
  api_secret: "qTxq4bru2iP5_K2n-HySqGyqVdo",
});

export const uploadImage = async (filePath: any) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "Posts",
  });
};

export const deleteImage = async (public_id: any) => {
  return await cloudinary.uploader.destroy(public_id);
};
