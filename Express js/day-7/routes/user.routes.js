import { Router } from "express";

const userRouter = Router();

userRouter.get("/create-user", (req, res) => {
  res.send("User created");
});

userRouter.get("/delete-user", (req, res) => {
  res.send("User deleted");
});

userRouter.get("/update-user", (req, res) => {
  res.send("User updated");
});

export default userRouter;
