import { Router } from "express";
import { protect } from "../middleware/protect.js";
import fileUpload from "../utils/muleterUpload.js";
import { supabaseUpdateMovie } from "../utils/supabaseUpload.js";
import pool from "../utils/db.js";
// import multer from "multer";

const adminRouter = Router();
adminRouter.use(protect);

adminRouter.post("/createMovie", fileUpload, async (req, res) => {
  let thumbnail = "";
  let thumbnailUrl = "";
  let poster = "";
  let posterUrl = "";
  let video = "";
  let videoUrl = "";
  try {
    const dataMovie = {
      ...req.body.data,
    };
    const castArray = req.body.data.cast;
    const thumbnailName = req.body.thumbnailName
      ? req.body.thumbnailName
      : (req.body.thumbnailName = null);
    const posterName = req.body.posterName
      ? req.body.posterName
      : (req.body.posterName = null);
    const videoName = req.body.videoName
      ? req.body.videoName
      : (req.body.videoName = null);

    if (req.files && req.files.thumbnailFile && req.files.thumbnailFile[0]) {
      console.log(originalThumbnailName);
      const { fileName, Url } = await supabaseUpdateMovie(
        thumbnailName,
        req.files.thumbnailFile[0],
        "thumbnail"
      );
      thumbnail = fileName;
      thumbnailUrl = Url;
    }

    if (req.files && req.files.posterFile && req.files.posterFile[0]) {
      const { fileName, Url } = await supabaseUpdateMovie(
        posterName,
        req.files.posterFile[0],
        "poster"
      );
      poster = fileName;
      posterUrl = Url;
    }

    if (req.files && req.files.videoFile && req.files.videoFile[0]) {
      console.log(originalVideoName);
      const { fileName, Url } = await supabaseUpdateMovie(
        videoName,
        req.files.videoFile[0],
        "video"
      );
      video = fileName;
      videoUrl = Url;
    }

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
    const data = await pool.query(query, value);
    if (castArray) {
      try {
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
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
  return res.status(200).json({ message: "create successful" });
});

adminRouter.post("/createSeries", fileUpload, async (req, res) => {
  const episode = req.files.episode;
  console.log(episode);
  try {
  } catch (error) {
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
  return res.status(200).json({ message: "create successful" });
});

adminRouter.put("/updateMovie/:id", fileUpload, async (req, res) => {
  const dataMovie = {
    ...req.body.data,
  };
  const id = req.params.id;
  const castArray = req.body.data.cast_names;
  console.log(req.body.data.cast_names);
  try {
    const originalThumbnailName = req.body.data.thumbnail_name
      ? req.body.data.thumbnail_name
      : (req.body.data.thumbnail_name = null);
    const originalPosterName = req.body.data.poster_name
      ? req.body.data.poster_name
      : (req.body.data.poster_name = null);
    const originalVideoName = req.body.data.video_name
      ? req.body.data.video_name
      : (req.body.data.video_name = null);

    if (req.files && req.files.thumbnailFile && req.files.thumbnailFile[0]) {
      console.log(originalThumbnailName);
      const { fileName, Url } = await supabaseUpdateMovie(
        originalThumbnailName,
        req.files.thumbnailFile[0],
        "thumbnail"
      );
      const query = `UPDATE data_movie SET thumbnail_name = $1, thumbnail_url = $2 WHERE id = $3`;
      const value = [fileName, Url, id];
      await pool.query(query, value);
      console.log("Updated thumbnail");
    }

    if (req.files && req.files.posterFile && req.files.posterFile[0]) {
      const { fileName, Url } = await supabaseUpdateMovie(
        originalPosterName,
        req.files.posterFile[0],
        "poster"
      );
      const query = `UPDATE data_movie SET poster_name = $1, poster_url = $2 WHERE id = $3`;
      const value = [fileName, Url, id];
      await pool.query(query, value);
      console.log("Updated poster");
    }

    if (req.files && req.files.videoFile && req.files.videoFile[0]) {
      console.log(originalVideoName);
      const { fileName, Url } = await supabaseUpdateMovie(
        originalVideoName,
        req.files.videoFile[0],
        "video"
      );
      const query = `UPDATE data_movie SET video_name = $1, video_url = $2 WHERE id = $3`;
      const value = [fileName, Url, id];
      await pool.query(query, value);
      console.log("Updated video");
    }

    const create = new Date();
    const update = new Date();
    const query = `UPDATE data_movie set title=$1,author=$2,release_date=$3,hours=$4,min=$5,rating=$6,description=$7,type=$8,genres=$9,mpa=$10,updated_at=$11 WHERE id=$12
      RETURNING id `;
    const value = [
      dataMovie.title,
      dataMovie.author,
      dataMovie.release_date,
      dataMovie.hours,
      dataMovie.min,
      dataMovie.rating,
      dataMovie.description,
      dataMovie.type,
      dataMovie.genres,
      dataMovie.mpa,
      update,
      id,
    ];
    await pool.query(query, value);
    // console.log(castArray);
    if (castArray) {
      try {
        for (const cast of castArray) {
          if (cast.id) {
            const castQuery = `
                    UPDATE cast_name
                    SET cast_name = $2
                    WHERE id = $1`;
            const castValues = [cast.id, cast.cast_name];
            await pool.query(castQuery, castValues);
          } else {
            const castQuery = `
                    INSERT INTO cast_name (data_movie_id, cast_name)
                    VALUES ($1, $2)`;
            const castValues = [id, cast.cast_name];
            await pool.query(castQuery, castValues);
          }
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: " failed",
          error_message: error,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " failed",
      error_message: error.message,
    });
  }
  return res.status(200).json({ message: "update successful" });
});

adminRouter.get("/movies/:id", async (req, res) => {
  try {
    const Id = req.params.id;
    // console.log(Id);
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
          'cast_name', cast_name.cast_name,
          'id', cast_name.id,
          'movie_id', data_movie_id
        )) AS cast_names
      FROM data_movie
      LEFT JOIN cast_name ON data_movie.id = cast_name.data_movie_id
      WHERE data_movie.id = $1
      GROUP BY data_movie.id;
    `,
      [Id]
    );
    // console.log(result.rows[0]);
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
