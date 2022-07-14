import express from 'express';
import EmailController from '../controllers/Email';
import EmailMiddleware from '../middlewares/Email';

const EmailRouter: express.Router = express.Router();

EmailRouter.delete('/:id', EmailMiddleware.validateId, EmailController.deleteEmailById);

export default EmailRouter;
