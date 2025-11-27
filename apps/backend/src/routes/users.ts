import { Router, Request, Response } from "express";

import { getUsers, getUsersCount } from "../db/users/users";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  let pageNumber = Number(req.query.pageNumber);
  let pageSize = Number(req.query.pageSize);

  // Validate and set defaults for pageNumber and pageSize
  if (isNaN(pageNumber) || pageNumber < 0) {
    pageNumber = 0;
  }
  if (isNaN(pageSize) || pageSize < 1) {
    pageSize = 4;
  }

  try {
    const users = await getUsers(pageNumber, pageSize);
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: "Error fetching users" });
  }
});

router.get("/count", async (req: Request, res: Response) => {
  try {
    const count = await getUsersCount();
    res.send({ count });
  } catch (error) {
    res.status(500).send({ error: "Error fetching user count" });
  }
});

export default router;
