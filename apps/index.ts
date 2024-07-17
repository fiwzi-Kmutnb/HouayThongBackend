import express, { Request, Response } from 'express';

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});