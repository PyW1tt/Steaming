import { Router } from "express";
import pool from "../utils/db.js";

const unauthenticatedRouter = Router();

unauthenticatedRouter.get("/movies", async (req, res) => {
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
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
});
unauthenticatedRouter.get("/series", async (req, res) => {
  try {
    const result = await pool.query(`
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
  LEFT JOIN cast_name ON data_series.id = cast_name.data_series_id
  LEFT JOIN episodes ON data_series.id = episodes.data_series_id
  GROUP BY data_series.id;
      `);
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " failed",
      error_message: error,
    });
  }
});
unauthenticatedRouter.get("/getAll", async (req, res) => {
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
            )), '[]'::jsonb) AS episodes
          FROM data_series
          LEFT JOIN episodes ON data_series.id = episodes.data_series_id   
          WHERE data_series.title ILIKE $1 OR data_series.author ILIKE $1 OR data_series.genres ILIKE $1
          GROUP BY data_series.id 
          UNION
          SELECT 
            data_movie.id AS movie_id, data_movie.title, data_movie.author, data_movie.release_date, data_movie.rating, data_movie.description, data_movie.type, data_movie.genres, data_movie.mpa, data_movie.thumbnail_name, data_movie.thumbnail_url, data_movie.created_at, data_movie.updated_at,
            poster_url, video_url, hours, min,
            NULL AS episodes
          FROM data_movie       
          WHERE data_movie.title ILIKE $2 OR data_movie.author ILIKE $2 OR data_movie.genres ILIKE $2
          GROUP BY data_movie.id
          ORDER BY rating DESC
          LIMIT $3`;
      values = [keywords, keywords, limit];
    } else if (limit) {
      query = `
          SELECT 
            data_series.id AS series_id, data_series.title, data_series.author, data_series.release_date, data_series.rating, data_series.description, data_series.type, data_series.genres, data_series.mpa, data_series.thumbnail_name, data_series.thumbnail_url, data_series.created_at, data_series.updated_at,
            NULL AS poster_url,
            NULL AS video_url,
            NULL AS hours,
            NULL AS min,
            COALESCE(jsonb_agg(DISTINCT jsonb_build_object(
                'id', episodes.id,
                'episodes_ep', episodes.episodes_ep,
                'hours', episodes.hours,    
                'min', episodes.min,    
                'coverUrl', episodes.poster_url,    
                'videoUrl', episodes.video_url
            )), '[]'::jsonb) AS episodes
          FROM data_series
          LEFT JOIN episodes ON data_series.id = episodes.data_series_id
          GROUP BY data_series.id 
          UNION
          SELECT 
            data_movie.id AS movie_id, data_movie.title, data_movie.author, data_movie.release_date, data_movie.rating, data_movie.description, data_movie.type, data_movie.genres, data_movie.mpa, data_movie.thumbnail_name, data_movie.thumbnail_url, data_movie.created_at, data_movie.updated_at,
            poster_url, video_url, hours, min,
            NULL AS episodes
          FROM data_movie  
          GROUP BY data_movie.id
          ORDER BY rating DESC
          LIMIT $1`;
      values = [limit];
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
unauthenticatedRouter.get("/getRelease", async (req, res) => {
  const limit = req.query.limit;
  let query = "";
  let values = [];
  try {
    if (limit) {
      query = `SELECT 
      data_series.id AS series_id, data_series.title, data_series.author, data_series.release_date, data_series.rating, data_series.description, data_series.type, data_series.genres, data_series.mpa, data_series.thumbnail_name, data_series.thumbnail_url, data_series.created_at, data_series.updated_at,
      NULL AS poster_url,
      NULL AS video_url,
      COALESCE(jsonb_agg(jsonb_build_object(
          'coverUrl', episodes.poster_url,    
          'videoUrl', episodes.video_url
      )), '[]'::jsonb) AS episodes
  FROM data_series
  LEFT JOIN episodes ON data_series.id = episodes.data_series_id
  GROUP BY data_series.id 
  UNION
  SELECT 
      data_movie.id AS movie_id, data_movie.title, data_movie.author, data_movie.release_date, data_movie.rating, data_movie.description, data_movie.type, data_movie.genres, data_movie.mpa, data_movie.thumbnail_name, data_movie.thumbnail_url, data_movie.created_at, data_movie.updated_at,
      poster_url,video_url,
      NULL AS episodes
  FROM data_movie
  ORDER BY release_date DESC
        limit $1`;
      values = [limit];
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
export default unauthenticatedRouter;
