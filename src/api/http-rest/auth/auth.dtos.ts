import { z } from "zod";

export const UserDTOSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});

export const AuthCredentialsSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("This is not a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const RegisterUserDTOSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
});

export type IUserDTO = z.infer<typeof UserDTOSchema>;
export type IAuthCredentials = z.infer<typeof AuthCredentialsSchema>;
export type IRegisterUserDTO = z.infer<typeof RegisterUserDTOSchema>;

export const validUserDTO = UserDTOSchema.safeParse;
export const validArrUserDTO = z.array(UserDTOSchema).safeParse;
export const validAuthCredentials = AuthCredentialsSchema.safeParse;
