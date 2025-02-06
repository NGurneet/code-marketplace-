import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "application/zip") {
      cb(null, "uploads/zip/");
    } else if (file.mimetype.startsWith("image/")) {
      cb(null, "uploads/screenshots/");
    } else {
      cb(new Error("Invalid file type"), "false");
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });
