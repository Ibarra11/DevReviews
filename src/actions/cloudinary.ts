// @todo: should this be server-only
"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export async function deleteImgFromCloudinary(img: string) {
  const publicId = img.split("/").at(-1)?.split(".")[0];
  await cloudinary.uploader.destroy(`DevReviews/${publicId}`);
}

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
