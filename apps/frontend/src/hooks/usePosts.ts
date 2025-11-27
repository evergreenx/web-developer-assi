import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, deletePost } from "../services/postService";
import type { Post } from "../types";

export const usePosts = (userId: number) => {
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading: arePostsLoading,
    error: postsError,
  } = useQuery<Post[], Error>({
    queryKey: ["posts", userId],
    queryFn: () => fetchPosts(userId.toString()),
    enabled: !!userId, // Only fetch if userId is available
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
    },
  });

  const totalPosts = posts?.length || 0;

  return {
    posts,
    totalPosts,
    isLoading: arePostsLoading,
    error: postsError,
    deletePost: deletePostMutation.mutate,
  };
};
