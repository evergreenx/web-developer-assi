import axios from "axios";

const BASE_URL = "http://localhost:3001/api/posts";

export const fetchPosts = async (userId: string | undefined) => {
  const url = userId ? `${BASE_URL}?userId=${userId}` : BASE_URL;
  const response = await axios.get(url);
  return response.data;
};