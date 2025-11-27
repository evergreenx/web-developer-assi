import axios from "axios";
import type { Post } from "../types";

const BASE_URL = "http://localhost:3001/posts";

export const fetchPosts = async (userId: string | undefined): Promise<Post[]> => {
  const url = userId ? `${BASE_URL}?userId=${userId}` : BASE_URL;
  const response = await axios.get(url);
  return response.data;
};

export const createPost = async (
  userId: string,
  title: string,
  body: string
): Promise<Post> => {
  const response = await axios.post(BASE_URL, { userId, title, body });
  return response.data;
};

export const deletePost = async (postId: string): Promise<void> => { // Changed postId to string
  const url = `${BASE_URL}/${postId}`;
  await axios.delete(url);
};