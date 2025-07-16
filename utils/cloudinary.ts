// utils/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export async function uploadImage(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  const result = await cloudinary.uploader.upload(
    `data:${file.type};base64,${base64}`,
    {
      folder: "products",
      transformation: [{ width: 800, crop: "limit" }],
    }
  );

  return result.secure_url;
}

export async function deleteImage(imageUrl: string) {
  // Extract public ID from URL
  const parts = imageUrl.split("/");
  const filename = parts[parts.length - 1]; // e.g., abc123.jpg
  const publicId = `products/${filename.split(".")[0]}`; // assumes you uploaded to folder 'products'

  await cloudinary.uploader.destroy(publicId);
}
