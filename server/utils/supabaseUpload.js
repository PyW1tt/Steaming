import supabase from "../utils/supabaseAuth.js";

export async function supabaseUploadAvatar(file, avatarName) {
  try {
    // console.log("1");
    const uniqueId = Date.now();
    if (avatarName !== "none") {
      //   avatarName = `user/${avatarName}`;
      await supabase.storage.from("img").remove([avatarName]);
      avatarName = `user/${uniqueId}`;
      const { error: uploadError } = await supabase.storage
        .from("img")
        .upload(avatarName, file.buffer, {
          contentType: file.mimetype,
        });
      //   console.log("2");
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
      //   console.log("3");
      if (uploadError) {
        throw new Error(`Error uploading file: ${uploadError.message}`);
      }
    }
    const { data } = supabase.storage.from("img").getPublicUrl(avatarName);
    const url = data.publicUrl;
    // console.log("4");
    // console.log(url);
    // console.log(avatarName);
    return { avatarName: avatarName, url: url };
  } catch (error) {
    console.error(error);
    // console.log("5");
    return error.message;
  }
}
