import {z} from "zod";

export const createReviewSchema = z.object({
  comment: z
    .string()
    .trim()
    .min(1, { message: "Comment cannot be empty" })
    .max(500, { message: "Comment too long (max 500 chars)" }),
  rating: z
    .number()
    .min(1, { message: "Minimum rating is 1" })
    .max(5, { message: "Maximum rating is 5" })
    .optional(), // optional if user might not give rating
});
