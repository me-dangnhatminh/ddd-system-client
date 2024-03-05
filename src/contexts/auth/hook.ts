import { getMe } from "../../api/http-rest/auth/auth.api";
import { User } from "./user";

interface IErrorDetail {
  type: string;
  title: string;
  detail: string;
}

export function useUser() {
  return useQuery<User, IErrorDetail>({
    queryKey: [AuthQueryKeys.USER],
    queryFn: getMe,
  });
}
