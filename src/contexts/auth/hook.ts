import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/http-rest/user";

export function useUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
  });
}
