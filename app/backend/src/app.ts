import express from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(cors());
    this.app.use(express.json());

    this.app.get('/', (req, res) => {
      res.status(StatusCodes.OK).send('Contact List');
    });
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
  }
}

export { App }

export const { app } = new App();
