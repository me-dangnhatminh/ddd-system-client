// User DTO
export interface IUserDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export function isUserDTO(data: unknown): data is IUserDTO {
  if (typeof data !== "object" || data === null) return false;
  return "id" in data && "name" in data && "email" in data && "phone" in data;
}

export function isUsersDTO(data: unknown): data is IUserDTO[] {
  if (!Array.isArray(data)) return false;
  return data.every(isUserDTO);
}
