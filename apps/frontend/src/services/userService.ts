import axios from "axios";
import { User } from "../types"; // Import the User interface

const BASE_URL = "http://localhost:3001/api/users";

export const fetchUsers = async (pageNumber: number, pageSize: number): Promise<User[]> => {
  const response = await axios.get(`${BASE_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  return response.data;
};

export const fetchUsersCount = async (): Promise<number> => {
  const response = await axios.get(`${BASE_URL}/count`);
  return response.data.count;
};