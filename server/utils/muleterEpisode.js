import multer from "multer";

const episodesUpload = async (req, res, next) => {
  try {
    // Extracting episodes array from the request body
    const episodes = req.body;
    console.log(req.body);

    // Validating episodes array
    if (!Array.isArray(episodes)) {
      throw new Error("Invalid format for 'episodes' array.");
    }

    // Process each episode
    for (const episode of episodes) {
      // Assuming 'cover' and 'video' are file inputs in your form
      await multerUpload.fields([{ name: "cover" }, { name: "video" }])(
        req,
        res
      );
      const episodeCover = req.files["cover"][0];
      const episodeVideo = req.files["video"][0];

      console.log(episodeCover);
      console.log(episodeVideo);

      // Upload cover file
      await multerUpload.single("cover")(req, res);

      // Upload video file
      await multerUpload.single("video")(req, res);
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// const multerUpload = multer({
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg" ||
//       file.mimetype == "image/webp" ||
//       file.mimetype == "image/gif" ||
//       file.mimetype == "video/mp4" ||
//       file.mimetype == "video/mpeg" ||
//       file.mimetype == "video/webm" ||
//       file.mimetype == "video/x-msvideo"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(
//         new Error("Only .png, .jpg ,webp ,gif and .jpeg format allowed!")
//       );
//     }
//   },
// });

// const episodesUpload = multerUpload.array("episodes");

export default episodesUpload;
