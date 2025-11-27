import { Router, Request, Response } from "express";
import { createPost, deletePost, getPosts } from "../db/posts/posts";
import { checkUserExists } from "../db/users/users";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ error: "userId is required" });
    return;
  }

  try {
    const userExists = await checkUserExists(userId);
    if (!userExists) {
      return res.status(404).send({ error: `User with ID ${userId} not found` });
    }
    const posts = await getPosts(userId);
    res.send(posts);
  } catch (error) {
    res.status(500).send({ error: "Error fetching posts" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { title, body, userId } = req.body;
  if (!title || !body || !userId) {
    return res.status(400).send({ error: "title, body, and userId are required" });
  }

  try {
    const userExists = await checkUserExists(userId); // userId is now a string
    if (!userExists) {
      return res.status(404).send({ error: `User with ID ${userId} not found` });
    }
    const newPost = await createPost(userId, title, body); // userId is now a string
    res.status(201).send(newPost);
  } catch (error) {
    res.status(500).send({ error: "Error creating post" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const postId = req.params.id;
  if (!postId) {
    res.status(400).send({ error: "postId is required" });
    return;
  }
  try {
    const changes = await deletePost(postId);
    if (changes === 0) {
      res.status(404).send({ message: "Post not found" });
    }
    else {
      res.status(200).send({ message: "Post deleted successfully" });
    }
  } catch (error) {
    res.status(500).send({ error: "Error deleting post" });
  }
});

export default router;

