"use server";

import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function getSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: "DevReviews",
    },
    process.env.CLOUDINARY_API_SECRET as string
  );

  return { timestamp, signature };
}

export async function deleteImgFromCloudinary(img: string) {
  const publicId = img.split("/").at(-1)?.split(".")[0];
  await cloudinary.uploader.destroy(`DevReviews/${publicId}`);
  revalidatePath("/project/settings/[slug]", "page");
}
