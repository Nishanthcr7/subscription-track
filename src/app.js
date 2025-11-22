import express from 'express';
import { PORT } from '../config/env.js'
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from '../database/mongodb.js';

const app = express();

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscription', subscriptionRouter)


app.get('/', (req, res) => {
  res.send('welcome to subscription tracker !');
});

app.listen(PORT, async () => {

  console.log(`subscription tracker is running on ${PORT}`);
  await connectToDatabase()
})

export default app;