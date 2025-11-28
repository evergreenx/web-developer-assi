/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useQuery } from "@tanstack/react-query";
import { useQueryState, parseAsInteger } from "nuqs";
import { fetchUsers, fetchUsersCount } from "../services/userService";
import type { User } from "../types";

const parseAsOneIndexedInteger = parseAsInteger.withOptions({
  // @ts-ignore
  parse: (value: string) => (parseInt(value, 10) || 1) - 1,
  serialize: (value: number) => (value + 1).toString(),
});

export const useUsers = () => {
  const [pageNumber, setPageNumber] = useQueryState(
    "page",
    parseAsOneIndexedInteger.withDefault(0)
  );

  const {
    data: users,
    isLoading: areUsersLoading,
    error: usersError,
  } = useQuery<User[]> ({
    queryKey: ["users", pageNumber, 4],
    queryFn: () => fetchUsers(pageNumber, 4),
  });

  const {
    data: totalUsers,
    isLoading: isTotalUsersLoading,
    error: totalUsersError,
  } = useQuery<number>({
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
