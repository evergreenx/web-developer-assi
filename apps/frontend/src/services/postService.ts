import axios from "axios";
import type { Post } from "../types";

const BASE_URL = "http://localhost:3001/posts";

export const fetchPosts = async (userId: string | undefined): Promise<Post[]> => {
  const url = userId ? `${BASE_URL}?userId=${userId}` : BASE_URL;
  const response = await axios.get(url);
  return response.data;
};

export const deletePost = async (postId: number): Promise<void> => {
  const url = `${BASE_URL}/${postId}`;
  await axios.delete(url);
};