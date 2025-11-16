import express from 'express';
import {PORT } from './config/env.js'

const app = express();


app.get('/', (req, res) => {
  res.send('welcome to subscription tracker !');
});

app.listen(PORT, () => {
  console.log(`subscription tracker is running on ${PORT}`);
})

export default app;