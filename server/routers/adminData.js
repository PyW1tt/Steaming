import { Router } from "express";
import { protect } from "../middleware/protect.js";
import fileUpload from "../utils/muleterUpload.js";
import { supabaseUploadMovie } from "../utils/supabaseUpload.js";
import pool from "../utils/db.js";

const adminRouter = Router();
adminRouter.use(protect);

adminRouter.post("/createMovie", fileUpload, async (req, res) => {
  try {
    const dataMovie = {
      ...req.body.data,
    };
    const castArray = req.body.data.cast;
    const thumbnailName = req.body.thumbnailName;
    const posterName = req.body.posterName;
    const videoName = req.body.videoName;

    const thumbnailFile = req.files.thumbnailFile[0];
    const posterFile = req.files.posterFile[0];
    const videoFile = req.files.videoFile[0];

    const { thumbnail, thumbnailUrl, poster, posterUrl, video, videoUrl } =
      await supabaseUploadMovie(
        thumbnailName,
        thumbnailFile,
        posterName,
        posterFile,
        videoName,
        videoFile
      );
    const create = new Date();
    const update = new Date();
    const query = `insert into data_movie (title,author,release_date,hours,min,rating,description,type,genres,mpa,thumbnail_name,thumbnail_url,poster_name,poster_url,video_name,video_url,created_at,updated_at) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
        $12, $13, $14, $15, $16, $17, $18
      )RETURNING id `;
    const value = [
      dataMovie.title,
      dataMovie.author,
      dataMovie.date,
      dataMovie.hours,
      dataMovie.min,
      dataMovie.rating,
      dataMovie.description,
      dataMovie.type,
      dataMovie.genres,
      dataMovie.MPA,
      thumbnail,
      thumbnailUrl,
      poster,
      posterUrl,
      video,
      videoUrl,
      create,
      update,
    ];

    try {
      const data = await pool.query(query, value);
      const id = data.rows[0].id;
      const castQuery = `insert into cast_name (data_movie_id ,cast_name ) values ($1, $2 )`;
      for (const cast of castArray) {
        // console.log(cast);
        const castValues = [id, cast];
        await pool.query(castQuery, castValues);
        // console.log("1");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: " failed",
        error_message: error,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
  return res.status(200).json({ message: "successful" });
});

adminRouter.get("/movies/:id", async (req, res) => {
  try {
    const Id = req.params.id;
    console.log(Id);
    const result = await pool.query(
      `
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
      'cast_name', cast_name.cast_name
    ) ORDER BY cast_name_index) AS cast_names
  FROM data_movie
  LEFT JOIN (
    SELECT
      data_movie.id,
      cast_name.cast_name,
      ROW_NUMBER() OVER (PARTITION BY data_movie.id ORDER BY cast_name.id) - 1 AS cast_name_index
    FROM data_movie
    LEFT JOIN cast_name ON data_movie.id = cast_name.data_movie_id
  ) AS cast_name ON data_movie.id = cast_name.id
  WHERE data_movie.id = $1
  GROUP BY data_movie.id, data_movie.title, data_movie.author, data_movie.release_date, data_movie.hours, data_movie.min, data_movie.rating, data_movie.description, data_movie.type, data_movie.genres, data_movie.mpa, data_movie.thumbnail_name, data_movie.thumbnail_url, data_movie.poster_name, data_movie.poster_url, data_movie.video_name, data_movie.video_url, data_movie.created_at, data_movie.updated_at
  ORDER BY data_movie.id;
    `,
      [Id]
    );
    console.log(result.rows[0]);
    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
});

export default adminRouter;
