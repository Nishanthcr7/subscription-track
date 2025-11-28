import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get('/users', authorize, getUsers)
userRouter.get('/:id', authorize, getUser)
userRouter.post('/', (req, res) => res.send({ title: 'create users ' }))
userRouter.post('/:id', (req, res) => res.send({ title: 'update users ' }))
userRouter.delete('/:id', (req, res) => res.send({ title: 'delete users ' }))

export default userRouter;