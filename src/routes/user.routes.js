import { Router } from "express";

const userRouter = Router();

userRouter.get('/users', (req,res) => res.send({title: 'Get all users '}))
userRouter.get('/:id', (req,res) => res.send({title: 'Get user details '}))
userRouter.post('/', (req,res) => res.send({title: 'create users '}))
userRouter.post('/:id', (req,res) => res.send({title: 'update users '}))
userRouter.delete('/:id', (req,res) => res.send({title: 'delete users '}))

export default userRouter;