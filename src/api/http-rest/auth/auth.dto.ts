import { z } from "zod";

export const UserDTOSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  avatarUrl: z.string(),
});

export const SignUpDTOSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Emai must be include @. ex: demo@email.com "),
  password: z.string(),
});

export const AuthCredentialsSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Emai must be include @. ex: demo@email.com "),
  password: z.string().min(1, "Password is required"),
});

export type IUserDTO = z.infer<typeof UserDTOSchema>;
export type ISignUpDTO = z.infer<typeof SignUpDTOSchema>;
export type IAuthCredentials = z.infer<typeof AuthCredentialsSchema>;

export const validUserDTO = UserDTOSchema.safeParse;
export const validArrUserDTO = z.array(UserDTOSchema).safeParse;
export const validAuthCredentials = AuthCredentialsSchema.safeParse;
