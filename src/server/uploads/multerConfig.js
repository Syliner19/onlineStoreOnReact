import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deviceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "devices"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqName = `${uuidv4()}${ext}`;
    cb(null, uniqName);
  },
});
const uploadDevice = multer({
  storage: deviceStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const usersAvatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "usersAvatars"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqName = `${uuidv4()}${ext}`;
    cb(null, uniqName);
  },
});
const uploadUsersAvatar = multer({
  storage: usersAvatarStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export { uploadDevice, uploadUsersAvatar };
