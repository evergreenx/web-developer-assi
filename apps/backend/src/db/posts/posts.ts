import { connection } from "../connection";
import { selectPostsTemplate, deletePostTemplate } from "./query-tamplates";
import { Post } from "./types";

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
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
