import { connection } from "../connection";
import { selectPostsTemplate, deletePostTemplate, insertPostTemplate } from "./query-tamplates";
import { Post } from "./types";
import { v4 as uuidv4 } from "uuid";

export const getPosts = (userId: string): Promise<Post[]> => // userId changed to string
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

export const createPost = (
  userId: string, // userId changed to string
  title: string,
  body: string
): Promise<Post> =>
  new Promise((resolve, reject) => {
    let postId = uuidv4();
    postId = postId.replace(/-/g, ""); // Remove hyphens from UUID
    const createdAt = new Date().toISOString();
    connection.run(
      insertPostTemplate,
      [postId, userId, title, body, createdAt], // Include postId
      function (error) {
        if (error) {
          reject(error);
        }
        resolve({ id: postId, user_id: userId, title, body, created_at: createdAt }); // Return postId
      }
    );
  });

export const deletePost = (postId: string): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.run(deletePostTemplate, [postId], function (error) {
      if (error) {
        reject(error);
      }
      resolve(this.changes);
    });
  });
