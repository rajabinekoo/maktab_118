import { z } from "zod";

export const patchBlogSchema = z.object({
  hide: z
    .string()
    .refine(
      (value) => ["true", "false"].includes(value),
      "Hide must be boolean"
    ),
});

export const createBlogSchema = z.object({
  text: z.string().min(5),
  title: z.string().min(3),
  description: z.string().min(5),
  hide: z
    .string()
    .refine(
      (value) => ["true", "false"].includes(value),
      "Hide must be boolean"
    ),
});

export type createBlogSchemaType = z.infer<typeof createBlogSchema>;

export const updateBlogSchema = z.object({
  text: z.string().min(5).optional().or(z.literal("")),
  title: z.string().min(3).optional().or(z.literal("")),
  description: z.string().min(5).optional().or(z.literal("")),
});

const validSize = 1; // MB
const validThumbnailTypes = ["image/png", "image/jpeg", "image/jpg"];
export const thumbnailValidator = (file: File | undefined, required = true) => {
  if (!required && !file) return undefined;
  if (!file) return "Thumbnail is required";
  if (!validThumbnailTypes.includes(file.type)) {
    return `Thumbnail type must be ${validThumbnailTypes.join(", ")}`;
  }
  if (validSize * Math.pow(10, 6) < file.size) {
    return `Thumbnail size must be lower then ${validSize}MB`;
  }
};
