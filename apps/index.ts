import express, { Request, Response } from 'express';
import isLogin from './middleware/isLogin';

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users/address',isLogin,require('./context/address/address.controller'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});