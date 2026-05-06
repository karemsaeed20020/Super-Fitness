import { useQuery } from "@tanstack/react-query";
import { profileApi } from "../apis/profile.api";

export function useProfile() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: profileApi,
  });

  return {
    user: data?.user,
    isLoading,
    error,
    isError,
  };
}
