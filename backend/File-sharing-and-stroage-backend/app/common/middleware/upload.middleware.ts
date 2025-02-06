import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../../config/cloudinary.config";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    return {
      folder: "projects",
      format: file.mimetype === "application/zip" ? "zip" : "png",
    };
  },
});

const upload = multer({ storage });

export default upload;
