import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "devices"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqName = `${uuidv4()}${ext}`;
    cb(null, uniqName);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
export default upload;
