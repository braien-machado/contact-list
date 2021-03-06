import express from 'express';
import EmailController from '../controllers/Email';
import ContactMiddleware from '../middlewares/Contact';
import EmailMiddleware from '../middlewares/Email';

const EmailRouter: express.Router = express.Router();

EmailRouter.delete('/:id', EmailMiddleware.validateId, EmailController.deleteEmailById);
EmailRouter.patch(
  '/:id',
  EmailMiddleware.validateId,
  EmailMiddleware.validateEmail,
  EmailController.updateEmailById,
);
EmailRouter.post(
  '/',
  EmailMiddleware.validateCreateEmailBody,
  ContactMiddleware.validateOwnerId,
  EmailMiddleware.validateEmail,
  EmailController.createEmail,
);

export default EmailRouter;
