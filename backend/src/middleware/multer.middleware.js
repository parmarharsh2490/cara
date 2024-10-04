import multer from 'multer';

// const __filename = fileURLToPath(import.meta.url);
// // Use the '/tmp' directory for temporary file storage
// const uploadDir = '/tmp';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './../../tmp' );
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
  }
});


export const upload = multer({ storage: storage });
