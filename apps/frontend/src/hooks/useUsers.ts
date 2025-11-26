import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { fetchUsers, fetchUsersCount } from "../services/userService";
import type { User } from "../types"; // Import the User interface
 // Import the User interface

export const useUsers = () => {
  const [pageNumber, setPageNumber] = useQueryState("pageNumber", {
    defaultValue: 0,
    parser: (value) => parseInt(value) || 0,
    serializer: (value) => value.toString(),
  });
  const [pageSize, setPageSize] = useQueryState("pageSize", {
    defaultValue: undefined, // Remove default to force serialization
    parser: (value) => {
      const parsed = parseInt(value);
      return isNaN(parsed) ? 4 : parsed; // Ensure 4 if not present or invalid
    },
    serializer: (value) => value.toString(),
  });

  const {
    data: users,
    isLoading: areUsersLoading,
    error: usersError,
  } = useQuery<User[]>({ // Explicitly type data as User[]
    queryKey: ["users", pageNumber, pageSize],
    queryFn: () => fetchUsers(pageNumber, pageSize),
  });

  const {
    data: totalUsers,
    isLoading: isTotalUsersLoading,
    error: totalUsersError,
  } = useQuery<number>({ // Explicitly type data as number
    queryKey: ["totalUsers"],
    queryFn: fetchUsersCount,
  });

  return {
    users,
    totalUsers,
    isLoading: areUsersLoading || isTotalUsersLoading,
    error: usersError || totalUsersError,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
  };
};
