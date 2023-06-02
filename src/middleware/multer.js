import multer from "multer";
import path from "path";
import messages from "../utils/messages.js";

//multer
const Upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (![".jpg", ".jpeg", ".png"].includes(ext)) {
      cb(
        { message: "Extention image must be jpg/jpeg/png", code: "wrongtype" },
        false
      );
      return;
    }
    cb(null, true);
  },
});

//middleware
const uploadImg = (req, res, next) => {
  const upload = Upload.single("profile_img");

  upload(req, res, (err) => {
    if (err) {
      const { message, code } = err;
      if (code === "LIMIT_FILE_SIZE") {
        messages(res, 413, message);
      } else if (code === "wrongtype") {
        messages(res, 400, message);
      } else {
        messages(res, 500, "Something wrong when upload image", err);
      }
    } else {
      next();
    }
  });
};

export default uploadImg;
