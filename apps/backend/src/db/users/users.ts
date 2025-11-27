import { connection } from "../connection";

import {
  selectCountOfUsersTemplate,
  selectUsersTemplate,
  checkUserExistsTemplate,
} from "./query-templates";
import { User } from "./types";

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(
      selectCountOfUsersTemplate,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.count);
      }
    );
  });

export const checkUserExists = (userId: string): Promise<boolean> => // userId changed to string
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(
      checkUserExistsTemplate,
      [userId],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.count > 0);
      }
    );
  });

export const getUsers = (
  pageNumber: number,
  pageSize: number
): Promise<User[]> =>
  new Promise((resolve, reject) => {
    connection.all<any>(
      selectUsersTemplate,
      [pageNumber * pageSize, pageSize],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (!results) {
          resolve([]);
          return;
        }
        const users: User[] = results.map((row) => ({
          id: String(row.id), // Cast to string
          name: row.name,
          username: row.username,
          email: row.email,
          phone: row.phone,
          address: {
            street: row.street,
            city: row.city,
            state: row.state,
            zipcode: row.zipcode,
          },
        }));
        resolve(users);
      }
    );
  });
