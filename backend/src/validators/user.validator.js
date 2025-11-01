import {z} from "zod";

export const registerUserSchema = z.object({
    firstName: z
    .stirng()
    .trim()
    .min(1, {message: `Name cannot be empty`}),

    lastName: z.stirng().trim(),

    userName: z
    .stirng()
    .trim()
    .min(1, {message: `Username cannot be empty`}),

    email: z 
    .stirng({required_error: `Email is required`})
    .email({message: `Invalid Email Address`})
    .trim()
    .min(1, {message: `Email cannot be empty`}),

    password: z
    .string({required_error: `Password is required`})
    .trim()
    .min(6, {message: `At least 6 characters is required`})

});

export const loginUserSchema = z.object({
  email: z.string().email({ message: `Invalid Email Address` }).trim(),

  password: z
    .string({ required_error: `Password is required` })
    .trim()
    .min(6, { message: `At least 6 characters is required` }),
});