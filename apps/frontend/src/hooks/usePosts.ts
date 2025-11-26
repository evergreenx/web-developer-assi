import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../services/postService";
import type { Post } from "../types";

export const usePosts = (userId: number) => {
  const {
    data: posts,
    isLoading: arePostsLoading,
    error: postsError,
  } = useQuery<Post[], Error>({
    queryKey: ["posts", userId],
    queryFn: () => fetchPosts(userId.toString()),
    enabled: !!userId, // Only fetch if userId is available
  });

  const totalPosts = posts?.length || 0;

  return {
    posts,
    totalPosts,
    isLoading: arePostsLoading,
    error: postsError,
  };
};
