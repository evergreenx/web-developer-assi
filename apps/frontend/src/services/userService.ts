import axios from "axios";

const BASE_URL = "http://localhost:3001/users"; // Updated BASE_URL

export const fetchUsers = async (pageNumber: number, pageSize: number) => {
  const response = await axios.get(`${BASE_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  return response.data;
};

export const fetchUsersCount = async () => {
  const response = await axios.get(`${BASE_URL}/count`);
  return response.data.count;
};