import { z } from "zod";

export const UserDTOSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  name: z.string(),
  isVerified: z.boolean(),
  avatarUrl: z.string(),
});

export const UpdateProfileDTOSchema = z.object({
  rawAvatar: z.instanceof(File).optional(),
});

export type IUserDTO = z.infer<typeof UserDTOSchema>;
export type IUpdateProfileDTO = z.infer<typeof UpdateProfileDTOSchema>;

export const validUserDTO = UserDTOSchema.safeParse;

