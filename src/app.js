import express from 'express';
import { PORT } from '../config/env.js'
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from '../database/mongodb.js';
import errorMidleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })) // simply html form processer 
app.use(cookieParser()) //read cookies from reqs

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscription', subscriptionRouter)

app.use(errorMidleware)

app.get('/', (req, res) => {
  res.send('welcome to subscription tracker !');
});

app.listen(PORT, async () => {

  console.log(`subscription tracker is running on ${PORT}`);
  await connectToDatabase()
})

export default app;