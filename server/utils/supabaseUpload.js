import supabase from "../utils/supabaseAuth.js";

export async function supabaseUploadAvatar(file, avatarName) {
  try {
    const uniqueId = Date.now();
    if (avatarName !== "none") {
      await supabase.storage.from("img").remove([avatarName]);
      avatarName = `user/${uniqueId}`;
      const { error: uploadError } = await supabase.storage
        .from("img")
        .upload(avatarName, file.buffer, {
          contentType: file.mimetype,
        });
      if (uploadError) {
        throw new Error(`Error uploading file: ${uploadError.message}`);
      }
    } else {
      avatarName = `user/${uniqueId}`;
      const { error: uploadError } = await supabase.storage
        .from("img")
        .upload(avatarName, file.buffer, {
          contentType: file.mimetype,
        });
      if (uploadError) {
        throw new Error(`Error uploading file: ${uploadError.message}`);
      }
    }
    const { data } = supabase.storage.from("img").getPublicUrl(avatarName);
    const url = data.publicUrl;
    return { avatarName: avatarName, url: url };
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function supabaseUploadMovie(
  thumbnailName,
  thumbnailFile,
  posterName,
  posterFile,
  videoName,
  videoFile
) {
  const uniqueId = Date.now();
  try {
    if (thumbnailName !== "none") {
      await supabase.storage.from("img").remove([thumbnailName]);
      thumbnailName = `movie_img/thumbnail/${uniqueId}`;
      const { error: uploadError } = await supabase.storage
        .from("img")
        .upload(thumbnailName, thumbnailFile.buffer, {
          contentType: thumbnailFile.mimetype,
        });
      if (uploadError) {
        throw new Error(`Error uploading file: ${uploadError.message}`);
      }
    } else {
      thumbnailName = `movie_img/thumbnail/${uniqueId}`;
      const { error: uploadError } = await supabase.storage
        .from("img")
        .upload(thumbnailName, thumbnailFile.buffer, {
          contentType: thumbnailFile.mimetype,
        });
      if (uploadError) {
        throw new Error(`Error uploading file: ${uploadError.message}`);
      }
    }

    if (posterName !== "none") {
      await supabase.storage.from("img").remove([posterName]);
      posterName = `movie_img/poster/${uniqueId}`;
      const { error: uploadError } = await supabase.storage
        .from("img")
        .upload(posterName, posterFile.buffer, {
          contentType: posterFile.mimetype,
        });
      if (uploadError) {
        throw new Error(`Error uploading file: ${uploadError.message}`);
      }
    } else {
      posterName = `movie_img/poster/${uniqueId}`;
      const { error: uploadError } = await supabase.storage
        .from("img")
        .upload(posterName, posterFile.buffer, {
          contentType: posterFile.mimetype,
        });
      if (uploadError) {
        throw new Error(`Error uploading file: ${uploadError.message}`);
      }
    }

    if (videoName !== "none") {
      await supabase.storage.from("img").remove([videoName]);
      videoName = `movie_video/${uniqueId}`;
      const { error: uploadError } = await supabase.storage
        .from("video")
        .upload(videoName, videoFile.buffer, {
          contentType: videoFile.mimetype,
        });
      if (uploadError) {
        throw new Error(`Error uploading file: ${uploadError.message}`);
      }
    } else {
      videoName = `movie_video/${uniqueId}`;
      const { error: uploadError } = await supabase.storage
        .from("video")
        .upload(videoName, videoFile.buffer, {
          contentType: videoFile.mimetype,
        });
      if (uploadError) {
        throw new Error(`Error uploading file: ${uploadError.message}`);
      }
    }
    const { data: thumbnailData } = supabase.storage
      .from("img")
      .getPublicUrl(thumbnailName);
    const { data: posterData } = supabase.storage
      .from("img")
      .getPublicUrl(posterName);
    const { data: videoData } = supabase.storage
      .from("video")
      .getPublicUrl(videoName);
    const thumbnailUrl = thumbnailData.publicUrl;
    const posterUrl = posterData.publicUrl;
    const videoUrl = videoData.publicUrl;

    return {
      thumbnail: thumbnailName,
      thumbnailUrl,
      poster: posterName,
      posterUrl,
      video: videoName,
      videoUrl,
    };
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
