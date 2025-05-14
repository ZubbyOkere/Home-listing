import { createClient } from "@supabase/supabase-js";

const bucket = "hidden-haven";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export const uploadImage = async (image: File) => {
  const timeStamp = Date.now();
  const newName = `${timeStamp}-${image.name}`;

  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600" });
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
