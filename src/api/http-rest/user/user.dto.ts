import { z } from "zod";

export const UserDTOSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  avatarUrl: z.string(),
});

export const UpdateProfileDTOSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  rawAvatar: z.instanceof(File).optional(),
});

export type IUserDTO = z.infer<typeof UserDTOSchema>;
export type IUpdateProfileDTO = z.infer<typeof UpdateProfileDTOSchema>;

export const validUserDTO = UserDTOSchema.safeParse;

