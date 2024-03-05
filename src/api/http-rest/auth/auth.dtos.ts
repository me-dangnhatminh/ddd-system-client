import { z } from "zod";

const UserDTOSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});

const AuthCredentialsSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const LoginUserDTOSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const RegisterUserDTOSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
});

export type IUserDTO = z.infer<typeof UserDTOSchema>;
export type IAuthCredentials = z.infer<typeof AuthCredentialsSchema>;
export type ILoginUserDTO = z.infer<typeof LoginUserDTOSchema>;
export type IRegisterUserDTO = z.infer<typeof RegisterUserDTOSchema>;

export const validUserDTO = UserDTOSchema.safeParse;
export const validArrUserDTO = z.array(UserDTOSchema).safeParse;
