import { Router } from "express";
import { protect } from "../middleware/protect.js";
import fileUpload from "../utils/muleterUpload.js";
import { supabaseUploadAvatar } from "../utils/supabaseUpload.js";
import pool from "../utils/db.js";

const userRouter = Router();
userRouter.use(protect);

userRouter.put("/:userId", fileUpload, async (req, res) => {
  const userId = req.params.userId;
  //   console.log(userId);
  //   const file = req.files;
  //   const originalName = req.body.imgName;

  const originalName = req.body.imgName
    ? req.body.imgName
    : (req.body.imgName = null);
  //   console.log(Boolean(req.body.imgName === undefined));
  //   console.log(req.body.imgName);
  //   console.log(req.body.imgName);
  try {
    const { avatarName, url } = await supabaseUploadAvatar(
      req.files.avatars[0],
      originalName
      // req.params.userId
    );

    // console.log(avatarName);
    // console.log(url);
    const update = new Date();
    const query = `UPDATE user_profile SET profile_img = $1, img_name = $2, updated_at = $3 WHERE id = $4`;
    const value = [url, avatarName, update, userId];
    await pool.query(query, value);

    return res
      .status(200)
      .json({ message: "successful", data: { avatarName, url } });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
});

export default userRouter;
