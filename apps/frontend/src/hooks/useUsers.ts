import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { fetchUsers, fetchUsersCount } from "../services/userService";
import type { User } from "../types";


export const useUsers = () => {
  const [pageNumber, setPageNumber] = useQueryState("pageNumber", {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    defaultValue: 0,
    parser: (value: string) => parseInt(value) || 0,
    serializer: (value: { toString: () => unknown; }) => value.toString(),
  });
  const {
    data: users,
    isLoading: areUsersLoading,
    error: usersError,
  } = useQuery<User[]>({
    // Explicitly type data as User[]
    queryKey: ["users", pageNumber, 4],
    queryFn: () => fetchUsers(pageNumber, 4),
  });

  const {
    data: totalUsers,
    isLoading: isTotalUsersLoading,
    error: totalUsersError,
  } = useQuery<number>({
    // Explicitly type data as number
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
  };
};
