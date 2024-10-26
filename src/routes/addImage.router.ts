import express from "express";
import multer from "multer";
import path from "path";
const router = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload: any = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

// Check File Type
function checkFileType(file: any, cb: any) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png/;
  // Check the file extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check the file's mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

router.post("/upload", upload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = `uploads/${req.file.filename}`;

    res.status(200).json({ filePath });
  } catch (err) {
    console.log(err);
  }
});

export default router;