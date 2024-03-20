import { useQuery } from "@tanstack/react-query";
import { getMe, userLocalStorage } from "../api/http-rest/user";
import { useEffect } from "react";

export function useUser() {
  const { data, error: getMeErr } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  useEffect(() => {
    if (data) userLocalStorage.save(data);
  }, [data]);

  useEffect(() => {
    if (getMeErr) userLocalStorage.remove();
  }, [getMeErr]);

  return { data };
}
