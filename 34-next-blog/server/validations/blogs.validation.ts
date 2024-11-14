import { z } from "zod";

export const createBlogSchema = z.object({
  hide: z.boolean(),
  text: z.string().min(5),
  title: z.string().min(3),
  description: z.string().min(5),
});

export type createBlogSchemaType = z.infer<typeof createBlogSchema>;
