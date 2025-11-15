import {z} from "zod";

export const uploadResourceSchema = z.object({
  title: z
    .string({ required_error: `Title is required` })
    .trim()
    .min(1, { message: `Title cannot be empty` }),

  description: z
    .string({ required_error: `Description is required` })
    .trim()
    .min(1, { message: `description cannot be empty` }),

  difficulty: z.enum(["Hard", "Medium", "Easy"]),

  category: z.string().trim().min(1, { message: `category cannot be empty` }),

  resourceType: z.enum(["file", "link"]),

  // 'resourceLink' is now optional. We'll check it in the controller only if resourceType is 'link'.
  resourceLink: z
    .string({ required_error: `resource link can not be empty` })
    .trim()
    .min(1, { message: `resource link cannot be empty` })
    .optional(),
});