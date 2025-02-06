import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dadcbzu6u",
  api_key: process.env.CLOUDINARY_API_KEY || "468259489439831",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "evgUJZhvz6gws8fl05fw-wFaXHw",
});

export default cloudinary;
