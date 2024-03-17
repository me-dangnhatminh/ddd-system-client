import { z } from "zod";

export const SignUpDTOSchema = z.object({
  email: z.string().email("Emai must be include @. ex: demo@email.com "),
  password: z.string(),
  username: z.string(),
});

export const AuthCredentialsSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Emai must be include @. ex: demo@email.com "),
  password: z.string().min(1, "Password is required"),
});

export type ISignUpDTO = z.infer<typeof SignUpDTOSchema>;
export type IAuthCredentials = z.infer<typeof AuthCredentialsSchema>;

export const validAuthCredentials = AuthCredentialsSchema.safeParse;
