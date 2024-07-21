import express, { Request, Response } from 'express';
import isLogin from './middleware/isLogin';
import fileUpload from 'express-fileupload';

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload())

app.use('/api/v1/users/address',isLogin,require('./context/user/address/address.controller'));
app.use('/api/v1/users/auth',require('./context/user/auth/auth.controller'));

app.use('/api/v1/admin/category',require('./context/admin/category/category.controller'));
app.use('/api/v1/admin/product',require('./context/admin/product/product.controller'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});