import {z} from "zod";

export const registerUserSchema = z.object({
    firstName: z
    .string()
    .trim()
    .min(1, {message: `Name cannot be empty`}),

    lastName: z.string().trim(),

    userName: z
    .string()
    .trim()
    .min(1, {message: `Username cannot be empty`}),

    email: z 
    .string({required_error: `Email is required`})
    .email({message: `Invalid Email Address`})
    .trim()
    .min(1, {message: `Email cannot be empty`}),

    password: z
    .string({required_error: `Password is required`})
    .trim()
    .min(6, {message: `At least 6 characters is required`}),

    confirmPassword: z 
    .string({required_error: `Please confirm your password`})
    .trim(),
})
//refine() to compare password
.refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match", 
    path: ["confirmPassword"] //this will tell zod to show error on which field
})

export const loginUserSchema = z.object({
  email: z.string().email({ message: `Invalid Email Address` }).trim(),

  password: z
    .string({ required_error: `Password is required` })
    .trim()
    .min(6, { message: `At least 6 characters is required` }),
});