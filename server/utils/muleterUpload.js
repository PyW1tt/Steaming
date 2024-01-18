import multer from "multer";

const multerUpload = multer({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/webp" ||
      file.mimetype == "image/gif" ||
      file.mimetype == "video/mp4" ||
      file.mimetype == "video/mpeg" ||
      file.mimetype == "video/webm" ||
      file.mimetype == "video/x-msvideo"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error("Only .png, .jpg ,webp ,gif and .jpeg format allowed!")
      );
    }
  },
});
const fileUpload = multerUpload.fields([
  { name: "avatars" },
  { name: "posterFile" },
  { name: "thumbnailFile" },
  { name: "videoFile" },
  { name: "cover" },
  { name: "video" },
  { name: "newCover" },
  { name: "newVideo" },
]);

export default fileUpload;
