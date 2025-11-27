import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, deletePost, createPost } from "../services/postService";
import type { Post } from "../types";

export const usePosts = (userId: string) => { // userId changed to string
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading: arePostsLoading,
    error: postsError,
  } = useQuery<Post[], Error>({
    queryKey: ["posts", userId],
    queryFn: () => fetchPosts(userId),
    enabled: !!userId, // Only fetch if userId is available
  });

  const createPostMutation = useMutation({
    mutationFn: (newPost: { title: string; body: string }) =>
      createPost(userId, newPost.title, newPost.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
    },
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
    createPost: createPostMutation.mutate,
    isCreatingPost: createPostMutation.isPending, // Expose isPending
    createPostError: createPostMutation.error,   // Expose error
    deletePost: deletePostMutation.mutate,
  };
};
