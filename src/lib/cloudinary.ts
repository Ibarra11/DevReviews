"use server";
import "server-only";
import { v2 as cloudinary } from "cloudinary";

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
