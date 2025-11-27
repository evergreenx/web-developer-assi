import api from "./api";
import type { Post } from "../types";

const BASE_URL = "/posts";

export const fetchPosts = async (userId: string | undefined): Promise<Post[]> => {
  const url = userId ? `${BASE_URL}?userId=${userId}` : BASE_URL;
  const response = await api.get(url);
  return response.data;
};

export const createPost = async (
  userId: string,
  title: string,
  body: string
): Promise<Post> => {
  const response = await api.post(BASE_URL, { userId, title, body });
  return response.data;
};

export const deletePost = async (postId: string): Promise<void> => { 
  const url = `${BASE_URL}/${postId}`;
  await api.delete(url);
};