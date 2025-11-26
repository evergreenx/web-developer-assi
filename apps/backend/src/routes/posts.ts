import { Router, Request, Response } from "express";
import { getPosts, deletePost } from "../db/posts/posts";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ error: "userId is required" });
    return;
  }
  const posts = await getPosts(userId);
  res.send(posts);
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
    } else {
      res.status(200).send({ message: "Post deleted successfully" });
    }
  } catch (error) {
    res.status(500).send({ error: "Error deleting post" });
  }
});

export default router;
