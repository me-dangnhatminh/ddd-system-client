import { queryOptions } from "@tanstack/react-query";
import { getMe } from "../../api/http-rest/user";

export const userQuery = Object.freeze({
  me: () =>
    queryOptions({
      queryKey: ["me"],
      queryFn: async () => getMe(),
    }),
});
