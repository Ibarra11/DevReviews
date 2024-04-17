import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateCloudinaryFormData({
  media,
  timestamp,
  signature,
}: {
  media: string;
  timestamp: number;
  signature: string;
}) {
  const formData = new FormData();
  formData.append("file", media);
  formData.append(
    "api_key",
    process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string
  );
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("folder", "DevReviews");
  return formData;
}
