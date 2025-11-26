import { connection } from "../connection";

import {
  selectCountOfUsersTemplate,
  selectUsersTemplate,
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
          id: row.id,
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
