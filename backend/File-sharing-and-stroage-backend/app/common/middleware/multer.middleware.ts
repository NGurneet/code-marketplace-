import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the directory exists for the upload
const ensureDirectoryExistence = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Configure storage for uploading ZIP and screenshots
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Separate directories for ZIP and screenshots
    const dir =
      file.mimetype === "application/zip"
        ? "./uploads/zips"
        : "./uploads/screenshots";
    ensureDirectoryExistence(dir); // Ensure the directory exists
    cb(null, dir); // Store in the appropriate folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Generate a unique filename
  },
});

// File filter to allow only ZIP and image files
const fileFilter = (req: any, file: any, cb: any) => {
  const isValid =
    file.mimetype === "application/zip" || file.mimetype.startsWith("image/");
  isValid ? cb(null, true) : cb(new Error("Invalid file type"), false);
};

// Multer setup
export const upload = multer({ storage, fileFilter });
