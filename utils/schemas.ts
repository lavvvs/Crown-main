import { z, ZodSchema } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must be less than 100 characters." }),

  price: z.coerce.number().min(0, {
    message: "Price must be a positive number.",
  }),

  featured: z.coerce.boolean(),

  // ✅ New fields
  color: z.array(z.string()).nonempty({ message: "Select at least one color." }),
  length: z.array(z.string()).nonempty({ message: "Select at least one length." }),
  texture: z.array(z.string()).nonempty({ message: "Select at least one texture." }),
  categories: z.array(z.string()).nonempty({ message: "Select at least one category." }), // ✅ ADD THIS
  rating: z.coerce.number().min(1).max(5),
});
export const imageSchema = z.object({
  image: z
    .instanceof(Blob)
    .refine((file) => file.size > 0, { message: "Image is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Image must be under 5MB",
    })
    .refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), {
      message: "Only JPG, PNG, and WEBP files are allowed",
    }),
});

function validateImageFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, "File size must be less than 1MB")
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image");
}

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
}

export const reviewSchema = z.object({
  productId: z.string().refine((value) => value !== "", {
    message: "Product ID cannot be empty",
  }),
  authorName: z.string().refine((value) => value !== "", {
    message: "Author name cannot be empty",
  }),
  authorImageUrl: z.string().refine((value) => value !== "", {
    message: "Author image URL cannot be empty",
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  comment: z
    .string()
    .min(10, { message: "Comment must be at least 10 characters long" })
    .max(1000, { message: "Comment must be at most 1000 characters long" }),
});
