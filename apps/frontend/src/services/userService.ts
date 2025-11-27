import api from "./api";
import type { User } from "../types";

const BASE_URL = "/users";

export const fetchUsers = async (pageNumber: number, pageSize: number): Promise<User[]> => {
  const response = await api.get(`${BASE_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  return response.data;
};

export const fetchUsersCount = async (): Promise<number> => {
  const response = await api.get(`${BASE_URL}/count`);
  return response.data.count;
};

export const fetchUserById = async (userId: number): Promise<User> => {
  const response = await api.get(`${BASE_URL}/${userId}`);
  return response.data;
};