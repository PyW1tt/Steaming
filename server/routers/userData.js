import { Router } from "express";
import { protect } from "../middleware/protect.js";
import fileUpload from "../utils/muleterUpload.js";
import { supabaseUploadAvatar } from "../utils/supabaseUpload.js";
import pool from "../utils/db.js";

const userRouter = Router();
userRouter.use(protect);

userRouter.post("/:userId/watchList/:mediaId", async (req, res) => {
  const userId = req.params.userId;
  const mediaId = req.params.mediaId;
  const type = req.body.type;
  const create = new Date();
  const update = new Date();

  try {
    if (userId) {
      const query = `INSERT INTO watch_list (add, created_at, updated_at, ${
        type === "movie" ? "data_movie_id" : "data_series_id"
      }, user_profile_id) VALUES ($1, $2, $3, $4, $5) RETURNING id`;

      const value = [true, create, update, mediaId, userId];

      const result = await pool.query(query, value);
      return res
        .status(200)
        .json({ data: result.rows[0].id, message: "Add watchlist successful" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
});
userRouter.put("/watchList/:mediaId", async (req, res) => {
  const mediaId = req.params.mediaId;
  const bool = req.body.bool;
  const update = new Date();

  try {
    const query = `UPDATE watch_list SET add=$1, updated_at=$2 WHERE id=$3`;

    const value = [bool === "true" ? true : false, update, mediaId];

    await pool.query(query, value);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
  return res.status(200).json({ message: "Add watchlist successful" });
});
userRouter.put("/:userId", fileUpload, async (req, res) => {
  const userId = req.params.userId;

  const originalName = req.body.imgName
    ? req.body.imgName
    : (req.body.imgName = null);
  try {
    const { avatarName, url } = await supabaseUploadAvatar(
      req.files.avatars[0],
      originalName
    );

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
userRouter.get("/getMyLists/:id", async (req, res) => {
  const id = req.params.id;
  let query = "";
  let values = [];

  try {
    query = `SELECT 
      data_series.id AS series_id, data_series.title, data_series.author, data_series.release_date, data_series.rating, data_series.description, data_series.type, data_series.genres, data_series.mpa, data_series.thumbnail_name, data_series.thumbnail_url, data_series.created_at, data_series.updated_at,
      NULL AS poster_url,
      NULL AS video_url,
      NULL AS hours,
      NULL AS min,
      COALESCE(jsonb_agg(jsonb_build_object(
          'id', episodes.id,
          'episodes_ep',episodes.episodes_ep,
          'hours', episodes.hours,    
          'min', episodes.min,    
          'coverUrl', episodes.poster_url,    
          'videoUrl', episodes.video_url
      )), '[]'::jsonb) AS episodes
  FROM data_series
  LEFT JOIN episodes ON data_series.id = episodes.data_series_id
  LEFT JOIN watch_list ON data_series.id = watch_list.data_series_id
  WHERE watch_list.user_profile_id = $1
  AND watch_list.add = $2
  GROUP BY data_series.id 
  UNION
  SELECT 
      data_movie.id AS movie_id, data_movie.title, data_movie.author, data_movie.release_date, data_movie.rating, data_movie.description, data_movie.type, data_movie.genres, data_movie.mpa, data_movie.thumbnail_name, data_movie.thumbnail_url, data_movie.created_at, data_movie.updated_at,
      poster_url,video_url,hours, min,
      NULL AS episodes
  FROM data_movie
  LEFT JOIN watch_list ON data_movie.id = watch_list.data_movie_id
  WHERE watch_list.user_profile_id = $1
  AND watch_list.add = $2
  ORDER BY rating DESC`;
    values = [id, true];

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
userRouter.get("/:id/getAll", async (req, res) => {
  const id = req.params.id;
  let keywords = req.query.keywords;
  const limit = req.query.limit;
  let query = "";
  let values = [];
  try {
    if (keywords && limit) {
      keywords = "%" + keywords + "%";
      query = `
        SELECT 
        data_series.id AS series_id, data_series.title, data_series.author, data_series.release_date, data_series.rating, data_series.description, data_series.type, data_series.genres, data_series.mpa, data_series.thumbnail_name, data_series.thumbnail_url, data_series.created_at, data_series.updated_at,
        NULL AS poster_url,
        NULL AS video_url,
        NULL AS hours,
        NULL AS min,
        COALESCE(jsonb_agg(jsonb_build_object(
            'id', episodes.id,
            'episodes_ep', episodes.episodes_ep,
            'hours', episodes.hours,    
            'min', episodes.min,  
            'coverUrl', episodes.poster_url,    
            'videoUrl', episodes.video_url
        )), '[]'::jsonb) AS episodes,
        COALESCE(jsonb_agg(DISTINCT jsonb_build_object(
          'watchListAdd', watch_list.add ,       
          'watchListId' , watch_list.id,
          'seriesId' , watch_list.user_profile_id,
          'userId' , watch_list.user_profile_id
        )), '[]'::jsonb) AS watch_list
      FROM data_series
      LEFT JOIN episodes ON data_series.id = episodes.data_series_id
      LEFT JOIN watch_list ON data_series.id = watch_list.data_series_id AND watch_list.user_profile_id = $1
      WHERE (data_series.title ILIKE $2 OR data_series.author ILIKE $2 OR data_series.genres ILIKE $2)
      GROUP BY data_series.id 
      UNION
      SELECT 
        data_movie.id AS movie_id, data_movie.title, data_movie.author, data_movie.release_date, data_movie.rating, data_movie.description, data_movie.type, data_movie.genres, data_movie.mpa, data_movie.thumbnail_name, data_movie.thumbnail_url, data_movie.created_at, data_movie.updated_at,
        poster_url, video_url, hours, min,
        NULL AS episodes,
        COALESCE(jsonb_agg(DISTINCT jsonb_build_object(
          'watchListAdd', watch_list.add ,       
          'watchListId' , watch_list.id,
          'movieId' , watch_list.user_profile_id,
          'userId' , watch_list.user_profile_id
        )), '[]'::jsonb) AS watch_list
      FROM data_movie
      LEFT JOIN watch_list ON data_movie.id = watch_list.data_movie_id AND watch_list.user_profile_id = $3
      WHERE (data_movie.title ILIKE $4 OR data_movie.author ILIKE $4 OR data_movie.genres ILIKE $4)     
      GROUP BY data_movie.id
      ORDER BY rating DESC
      LIMIT $5;`;
      values = [id, keywords, id, keywords, limit];
    } else if (limit) {
      query = `SELECT 
      data_series.id AS series_id, data_series.title, data_series.author, data_series.release_date, data_series.rating, data_series.description, data_series.type, data_series.genres, data_series.mpa, data_series.thumbnail_name, data_series.thumbnail_url, data_series.created_at, data_series.updated_at,
      NULL AS poster_url,
      NULL AS video_url,
      NULL AS hours,
      NULL AS min,
      COALESCE(jsonb_agg(DISTINCT jsonb_build_object(
          'id', episodes.id,
          'episodes_ep',episodes.episodes_ep,
          'hours', episodes.hours,    
          'min', episodes.min,    
          'coverUrl', episodes.poster_url,    
          'videoUrl', episodes.video_url
      )), '[]'::jsonb) AS episodes,
      COALESCE(jsonb_agg(DISTINCT jsonb_build_object(
        'watchListAdd', watch_list.add ,       
        'watchListId' , watch_list.id,
        'seriesId' , watch_list.user_profile_id,
        'userId' , watch_list.user_profile_id
)), '[]'::jsonb) AS watch_list
        FROM data_series
  LEFT JOIN watch_list ON data_series.id= watch_list.data_series_id AND watch_list.user_profile_id = $1
  LEFT JOIN episodes ON data_series.id = episodes.data_series_id
    GROUP BY data_series.id 
  UNION
  SELECT 
      data_movie.id AS movie_id, data_movie.title, data_movie.author, data_movie.release_date, data_movie.rating, data_movie.description, data_movie.type, data_movie.genres, data_movie.mpa, data_movie.thumbnail_name, data_movie.thumbnail_url, data_movie.created_at, data_movie.updated_at,
      poster_url,video_url,hours, min,
      NULL AS episodes,
      COALESCE(jsonb_agg(DISTINCT jsonb_build_object(
        'watchListAdd', watch_list.add ,       
        'watchListId' , watch_list.id,
        'movieId' , watch_list.user_profile_id,
        'userId' , watch_list.user_profile_id
)), '[]'::jsonb) AS watch_list 
        FROM data_movie
  LEFT JOIN watch_list ON data_movie.id = watch_list.data_movie_id AND watch_list.user_profile_id = $2
    GROUP BY data_movie.id
  ORDER BY rating DESC
        limit $3`;
      values = [id, id, limit];
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
userRouter.get("/episode/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      `SELECT * FROM episodes WHERE episodes.id = $1`,
      [id]
    );

    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
});
export default userRouter;
