import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../services/userService";
import type { User } from "../types";

export const useUser = (userId: number) => {
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery<User, Error>({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
    enabled: !!userId, // Only fetch if userId is available
  });

  return {
    user,
    isLoading: isUserLoading,
    error: userError,
  };
};