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

export async function supabaseUpdateMovie(fileName, file, type) {
  const uniqueId = Date.now();
  try {
    if (type === "thumbnail") {
      // console.log(fileName);
      // console.log(fileName !== "none");
      if (fileName !== "none") {
        // console.log("1");
        await supabase.storage.from("img").remove([fileName]);

        fileName = `movie_img/thumbnail/${uniqueId}`;
        const { error: uploadError } = await supabase.storage
          .from("img")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });
        if (uploadError) {
          throw new Error(`Error uploading file: ${uploadError.message}`);
        }
      } else {
        fileName = `movie_img/thumbnail/${uniqueId}`;
        const { error: uploadError } = await supabase.storage
          .from("img")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });
        if (uploadError) {
          throw new Error(`Error uploading file: ${uploadError.message}`);
        }
      }
    }

    if (type === "poster") {
      if (fileName !== "none") {
        await supabase.storage.from("img").remove([fileName]);
        console.log("delete poster");
        fileName = `movie_img/poster/${uniqueId}`;
        const { error: uploadError } = await supabase.storage
          .from("img")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });
        if (uploadError) {
          throw new Error(`Error uploading file: ${uploadError.message}`);
        }
      } else {
        fileName = `movie_img/poster/${uniqueId}`;
        const { error: uploadError } = await supabase.storage
          .from("img")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });
        if (uploadError) {
          throw new Error(`Error uploading file: ${uploadError.message}`);
        }
      }
    }

    if (type === "video") {
      if (fileName !== "none") {
        await supabase.storage.from("video").remove(fileName);
        console.log("delete video");
        fileName = `movie_video/${uniqueId}`;
        console.log(fileName);
        const { error: uploadError } = await supabase.storage
          .from("video")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });
        if (uploadError) {
          throw new Error(`Error uploading file: ${uploadError.message}`);
        }
      } else {
        fileName = `movie_video/${uniqueId}`;
        const { error: uploadError } = await supabase.storage
          .from("video")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });
        if (uploadError) {
          throw new Error(`Error uploading file: ${uploadError.message}`);
        }
      }
    }

    const { data: data } = supabase.storage
      .from(`${type === "video" ? "video" : "img"}`)
      .getPublicUrl(fileName);

    const Url = data.publicUrl;

    return {
      fileName: fileName,
      Url: Url,
    };
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed",
      error_message: error.message,
    });
  }
}

export async function supabaseCreateSeries(fileName, file) {
  const uniqueId = Date.now();
  try {
    if (fileName !== null) {
      await supabase.storage.from("img").remove([fileName]);
      fileName = `series_img/thumbnail/${uniqueId}`;
      const { error: uploadError } = await supabase.storage
        .from("img")
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });
      if (uploadError) {
        throw new Error(`Error uploading file: ${uploadError.message}`);
      }
    } else {
      fileName = `series_img/thumbnail/${uniqueId}`;
      const { error: uploadError } = await supabase.storage
        .from("img")
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });
      if (uploadError) {
        throw new Error(`Error uploading file: ${uploadError.message}`);
      }
    }

    const { data: data } = supabase.storage.from("img").getPublicUrl(fileName);
    const Url = data.publicUrl;
    // console.log(Url);
    // console.log(fileName);
    return {
      fileName: fileName,
      Url: Url,
    };
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed",
      error_message: error.message,
    });
  }
}

export async function supabaseCreateEpisode(fileName, file, type) {
  const uniqueId = Date.now();
  try {
    if (type === "cover") {
      if (fileName !== "") {
        await supabase.storage.from("img").remove([fileName]);

        fileName = `series_img/cover/${uniqueId}`;
        const { error: uploadError } = await supabase.storage
          .from("img")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });
        if (uploadError) {
          throw new Error(`Error uploading file: ${uploadError.message}`);
        }
      } else {
        fileName = `series_img/cover/${uniqueId}`;
        const { error: uploadError } = await supabase.storage
          .from("img")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });
        if (uploadError) {
          throw new Error(`Error uploading file: ${uploadError.message}`);
        }
      }
    }
    if (type === "video") {
      if (fileName !== "") {
        await supabase.storage.from("video").remove(fileName);
        console.log("delete video");
        fileName = `series_video/${uniqueId}`;
        console.log(fileName);
        const { error: uploadError } = await supabase.storage
          .from("video")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });
        if (uploadError) {
          throw new Error(`Error uploading file: ${uploadError.message}`);
        }
      } else {
        fileName = `series_video/${uniqueId}`;
        const { error: uploadError } = await supabase.storage
          .from("video")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });
        if (uploadError) {
          throw new Error(`Error uploading file: ${uploadError.message}`);
        }
      }
    }

    const { data: data } = supabase.storage
      .from(`${type === "video" ? "video" : "img"}`)
      .getPublicUrl(fileName);
    const Url = data.publicUrl;
    return {
      fileName: fileName,
      Url: Url,
    };
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed",
      error_message: error.message,
    });
  }
}
