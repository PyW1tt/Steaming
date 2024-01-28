import { Router } from "express";
import { protect } from "../middleware/protect.js";
import fileUpload from "../utils/muleterUpload.js";
import supabase from "../utils/supabaseAuth.js";
import {
  supabaseUpdateMovie,
  supabaseCreateSeries,
  supabaseCreateEpisode,
} from "../utils/supabaseUpload.js";
import pool from "../utils/db.js";

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
          const castValues = [id, cast];
          await pool.query(castQuery, castValues);
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
  let thumbnail = "";
  let thumbnailUrl = "";
  let seriesId = "";
  try {
    const castArray = req.body.cast;
    const thumbnailName = req.body.thumbnailName
      ? req.body.thumbnailName
      : (req.body.thumbnailName = null);
    if (req.files && req.files.thumbnailFile && req.files.thumbnailFile[0]) {
      const { fileName, Url } = await supabaseCreateSeries(
        thumbnailName,
        req.files.thumbnailFile[0]
      );
      thumbnail = fileName;
      thumbnailUrl = Url;
    }
    const create = new Date();
    const update = new Date();
    const query = `insert into data_series (title,author,release_date,rating,description,type,genres,mpa,thumbnail_name,thumbnail_url,created_at,updated_at) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12)RETURNING id `;
    const value = [
      req.body.movieData.title,
      req.body.movieData.author,
      req.body.movieData.date,
      req.body.movieData.rating,
      req.body.movieData.description,
      req.body.movieData.type,
      req.body.movieData.genres,
      req.body.movieData.MPA,
      thumbnail,
      thumbnailUrl,
      create,
      update,
    ];
    const data = await pool.query(query, value);
    seriesId = data.rows[0].id;
    if (castArray) {
      try {
        const id = data.rows[0].id;
        const castQuery = `insert into cast_name (data_series_id ,cast_name ) values ($1, $2 )`;
        for (const cast of castArray) {
          const castValues = [id, cast];
          await pool.query(castQuery, castValues);
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
  return res
    .status(200)
    .json({ message: "create series successful", data: seriesId });
});

adminRouter.post("/createEpisodes", fileUpload, async (req, res) => {
  let cover = "";
  let coverlUrl = "";
  let video = "";
  let videolUrl = "";
  const bodyData = [{ ...req.body, ...req.files }];
  try {
    for (const data of bodyData) {
      if (data.cover !== undefined) {
        const { fileName, Url } = await supabaseCreateEpisode(
          data.coverName,
          data.cover[0],
          "cover"
        );
        cover = fileName;
        coverlUrl = Url;
      }
      if (data.video !== undefined) {
        const { fileName, Url } = await supabaseCreateEpisode(
          data.videoName,
          data.video[0],
          "video"
        );
        video = fileName;
        videolUrl = Url;
      }
      const create = new Date();
      const update = new Date();
      const query = `insert into episodes (title,hours,min,details,episodes_ep,poster_name,poster_url,video_name,video_url,data_series_id,created_at,updated_at) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12)RETURNING id `;
      const value = [
        data.episodeName,
        data.hours,
        data.min,
        data.details,
        data.episode,
        cover,
        coverlUrl,
        video,
        videolUrl,
        data.data_series_id,
        create,
        update,
      ];
      await pool.query(query, value);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
  return res.status(200).json({ message: "create episodes successful" });
});

adminRouter.put("/updateSeries/:id", fileUpload, async (req, res) => {
  const dataMovie = {
    ...req.body.data,
  };
  const castArray = req.body.data.cast_names;
  const id = req.params.id;
  try {
    const originalThumbnailName = req.body.data.thumbnail_name
      ? req.body.data.thumbnail_name
      : (req.body.data.thumbnail_name = null);
    if (req.files && req.files.thumbnailFile && req.files.thumbnailFile[0]) {
      console.log(originalThumbnailName);
      const { fileName, Url } = await supabaseUpdateMovie(
        originalThumbnailName,
        req.files.thumbnailFile[0],
        "thumbnail"
      );
      const query = `UPDATE data_series SET thumbnail_name = $1, thumbnail_url = $2 WHERE id = $3`;
      const value = [fileName, Url, id];
      await pool.query(query, value);
    }

    const update = new Date();
    const query = `UPDATE data_series set title=$1,author=$2,release_date=$3,rating=$4,description=$5,type=$6,genres=$7,mpa=$8,updated_at=$9 WHERE id=$10
      RETURNING id `;
    const value = [
      dataMovie.title,
      dataMovie.author,
      dataMovie.release_date,
      dataMovie.rating,
      dataMovie.description,
      dataMovie.type,
      dataMovie.genres,
      dataMovie.mpa,
      update,
      id,
    ];
    await pool.query(query, value);
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
                    INSERT INTO cast_name (data_series_id, cast_name)
                    VALUES ($1, $2)`;
            const castValues = [id, cast.cast_name];
            await pool.query(castQuery, castValues);
          }
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "update cast_name failed",
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
adminRouter.put("/updateEpisodes/:id", fileUpload, async (req, res) => {
  const bodyData = [{ ...req.body, ...req.files }];
  try {
    for (const data of bodyData) {
      let cover = data.coverName;
      let coverlUrl = data.coverUrl;
      let video = data.videoName;
      let videolUrl = data.videoUrl;
      if (data.newCover !== undefined) {
        const { fileName, Url } = await supabaseCreateEpisode(
          data.coverName,
          data.newCover[0],
          "cover"
        );
        cover = fileName;
        coverlUrl = Url;
      }
      if (data.newVideo !== undefined) {
        const { fileName, Url } = await supabaseCreateEpisode(
          data.videoName,
          data.newVideo[0],
          "video"
        );
        video = fileName;
        videolUrl = Url;
      }
      const update = new Date();
      if (data.id) {
        const query = `UPDATE episodes set title=$1,hours=$2,min=$3,details=$4,episodes_ep=$5,poster_name=$6,poster_url=$7,video_name=$8,video_url=$9,data_series_id=$10,updated_at=$11 WHERE id=$12
      RETURNING id `;
        const value = [
          data.episodeName,
          data.hours,
          data.min,
          data.details,
          data.episode,
          cover,
          coverlUrl,
          video,
          videolUrl,
          data.data_series_id,
          update,
          data.id,
        ];
        await pool.query(query, value);
      } else {
        const query = `INSERT INTO episodes (title,hours,min,details,episodes_ep,poster_name,poster_url,video_name,video_url,data_series_id,updated_at
           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
        const value = [
          data.episodeName,
          data.hours,
          data.min,
          data.details,
          data.episode,
          cover,
          coverlUrl,
          video,
          videolUrl,
          req.params.id,
          update,
        ];
        await pool.query(query, value);
      }
    }
    return res.status(200).json({ message: "update successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " failed",
      error_message: error.message,
    });
  }
});

adminRouter.put("/updateMovie/:id", fileUpload, async (req, res) => {
  const dataMovie = {
    ...req.body.data,
  };
  const id = req.params.id;
  const castArray = req.body.data.cast_names;
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
      const { fileName, Url } = await supabaseUpdateMovie(
        originalThumbnailName,
        req.files.thumbnailFile[0],
        "thumbnail"
      );
      const query = `UPDATE data_movie SET thumbnail_name = $1, thumbnail_url = $2 WHERE id = $3`;
      const value = [fileName, Url, id];
      await pool.query(query, value);
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
    }

    if (req.files && req.files.videoFile && req.files.videoFile[0]) {
      const { fileName, Url } = await supabaseUpdateMovie(
        originalVideoName,
        req.files.videoFile[0],
        "video"
      );
      const query = `UPDATE data_movie SET video_name = $1, video_url = $2 WHERE id = $3`;
      const value = [fileName, Url, id];
      await pool.query(query, value);
    }

    const update = new Date();
    const query = `UPDATE data_movie SET title=$1,author=$2,release_date=$3,hours=$4,min=$5,rating=$6,description=$7,type=$8,genres=$9,mpa=$10,updated_at=$11 WHERE id=$12
       `;
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

adminRouter.get("/:userId/movies/:id", async (req, res) => {
  try {
    const userId = req.params.userId;
    const Id = req.params.id;
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
          'movie_id', cast_name.data_movie_id
        )) AS cast_names,
        COALESCE(jsonb_agg(DISTINCT jsonb_build_object(
          'watchListAdd', watch_list.add ,       
          'watchListId' , watch_list.id
        )), '[]'::jsonb) AS watch_list
      FROM data_movie
      LEFT JOIN cast_name ON data_movie.id = cast_name.data_movie_id
      LEFT JOIN watch_list ON data_movie.id = watch_list.data_movie_id AND watch_list.user_profile_id = $1
      WHERE data_movie.id = $2
      GROUP BY data_movie.id
    `,
      [userId, Id]
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

adminRouter.get("/:userId/series/:id", async (req, res) => {
  const userId = req.params.userId;
  const id = req.params.id;
  try {
    const result = await pool.query(
      `
      SELECT
      data_series.id,
      data_series.title,
      data_series.author,
      data_series.release_date,
      data_series.rating,
      data_series.description,
      data_series.type,
      data_series.genres,
      data_series.mpa,
      data_series.thumbnail_name,
      data_series.thumbnail_url,
      data_series.created_at,
      data_series.updated_at,
      COALESCE(jsonb_agg(DISTINCT jsonb_build_object(
        'cast_name', cast_name.cast_name,
        'id', cast_name.id,
        'series_id', data_series.id
      )), '[]'::jsonb) AS cast_names,
      COALESCE(jsonb_agg(DISTINCT jsonb_build_object(
        'watchListAdd', watch_list.add ,       
        'watchListId' , watch_list.id
      )), '[]'::jsonb) AS watch_list
    FROM data_series
    LEFT JOIN cast_name ON data_series.id = cast_name.data_series_id  
    LEFT JOIN watch_list ON data_series.id = watch_list.data_series_id AND watch_list.user_profile_id = $1
    WHERE data_series.id = $2
    GROUP BY data_series.id, data_series.title, data_series.author, data_series.release_date, data_series.rating, data_series.description, data_series.type, data_series.genres, data_series.mpa, data_series.thumbnail_name, data_series.thumbnail_url, data_series.created_at, data_series.updated_at
    ORDER BY data_series.id;
    `,
      [userId, id]
    );
    const episodes = await pool.query(
      `SELECT
      COALESCE(jsonb_agg(jsonb_build_object(
        'episode', episodes.episodes_ep,
        'episodeName', episodes.title,
        'details', episodes.details,
        'hours', episodes.hours,
        'min', episodes.min,
        'coverName', episodes.poster_name,
        'coverUrl', episodes.poster_url,
        'videoName', episodes.video_name,
        'videoUrl', episodes.video_url,
        'id', episodes.id,
        'series_id', episodes.data_series_id
      )), '[]'::jsonb) AS episodes
    FROM data_series
    LEFT JOIN episodes ON data_series.id = episodes.data_series_id
    WHERE data_series.id = $1
    GROUP BY data_series.id;`,
      [id]
    );
    const dataSeries = { ...result.rows[0], ...episodes.rows[0] };
    return res.status(200).json({ data: dataSeries });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
});

adminRouter.delete("/movie/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (req.body.poster) {
      await supabase.storage.from("img").remove([req.body.poster]);
    }
    if (req.body.thumbnail) {
      await supabase.storage.from("img").remove([req.body.thumbnail]);
    }
    if (req.body.video) {
      await supabase.storage.from("video").remove([req.body.video]);
    }
    const query = `delete from data_movie WHERE id = $1`;
    await pool.query(query, [id]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
  return res.status(200).json({ message: "delete successful" });
});

adminRouter.delete("/episode/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (req.body.poster) {
      await supabase.storage.from("img").remove([req.body.poster]);
    }
    if (req.body.video) {
      await supabase.storage.from("video").remove([req.body.video]);
    }
    const query = `delete from episodes WHERE id = $1`;
    await pool.query(query, [id]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
  return res.status(200).json({ message: "delete successful" });
});

adminRouter.delete("/series/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (req.body.thumbnail) {
      await supabase.storage.from("img").remove([req.body.thumbnail]);
    }
    const query = `delete from data_series WHERE id = $1`;
    await pool.query(query, [id]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
  return res.status(200).json({ message: "delete successful" });
});

adminRouter.delete("/media/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (req.body.cover) {
      await supabase.storage.from("img").remove([req.body.cover]);
    }
    if (req.body.video) {
      await supabase.storage.from("img").remove([req.body.video]);
    }
    const query = `delete from data_series WHERE id = $1`;
    await pool.query(query, [id]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
  return res.status(200).json({ message: "delete successful" });
});

export default adminRouter;
