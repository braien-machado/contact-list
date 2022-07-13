import express from 'express';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).send('Contact List');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});