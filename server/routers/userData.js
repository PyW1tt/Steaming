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

userRouter.get("/movies", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
      data_movie.id,
  data_movie.title,
  data_movie.author,
  data_movie.release_date,
  data_movie.hours,
  data_movie.min,
  data_movie.rating,
  data_movie.description,
  data_movie.type,
  data_movie.genres,
  data_movie.mpa,
  data_movie.thumbnail_name,
  data_movie.thumbnail_url,
  data_movie.poster_name,
  data_movie.poster_url,
  data_movie.video_name,
  data_movie.video_url,
  data_movie.created_at,
  data_movie.updated_at,
        jsonb_agg(jsonb_build_object(
          'cast_name', cast_name.cast_name,
          'id', cast_name.id,
          'movie_id', data_movie_id
        )) AS cast_names
      FROM data_movie
      LEFT JOIN cast_name ON data_movie.id = cast_name.data_movie_id
      GROUP BY data_movie.id;
    `);

    // console.log(result.rows);
    // console.log(result.rows[0].cast_names[0].cast_name);
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
});

userRouter.get("/getAll", async (req, res) => {
  let keywords = req.query.keywords;
  // console.log(keywords);
  let query = "";
  let values = [];
  try {
    if (keywords) {
      keywords = "%" + keywords + "%";
      query = `SELECT id, title, author, release_date, rating, description, type, genres, mpa, thumbnail_name, thumbnail_url, created_at, updated_at
        FROM data_series
        WHERE title ILIKE $1 OR author ILIKE $1 OR genres ILIKE $1
        UNION
        SELECT id, title, author, release_date, rating, description, type, genres, mpa, thumbnail_name, thumbnail_url, created_at, updated_at
        FROM data_movie
        WHERE title ILIKE $1 OR author ILIKE $1 OR genres ILIKE $1
        ORDER BY rating DESC`;
      values = [keywords];
    } else {
      query = `SELECT id, title, author, release_date, rating, description, type, genres, mpa, thumbnail_name, thumbnail_url, created_at, updated_at
        FROM data_series
        UNION
        SELECT id, title, author, release_date, rating, description, type, genres, mpa, thumbnail_name, thumbnail_url, created_at, updated_at
        FROM data_movie
        ORDER BY rating DESC`;
    }
    const result = await pool.query(query, values);
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
});

export default userRouter;
