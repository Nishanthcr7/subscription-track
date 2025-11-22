import { Router } from "express";

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) => res.send({ title: "get sub"}));

subscriptionRouter.get('/:id', (req, res) => res.send({ title: "get sub details"}));

subscriptionRouter.post('/', (req, res) => res.send({ title: "create sub"}));

subscriptionRouter.post('/:id', (req, res) => res.send({ title: "update sub"}));

subscriptionRouter.delete('/:id', (req, res) => res.send({ title: "delete sub"}));

subscriptionRouter.post('/users/:id', (req, res) => res.send({ title: "get all user sub"}));

subscriptionRouter.post('/:id/cancel', (req, res) => res.send({ title: "cancel sub"}));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: "upcoming sub"}));

export default subscriptionRouter;