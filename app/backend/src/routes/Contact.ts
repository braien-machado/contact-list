import express from 'express';
import ContactController from '../controllers/Contact';
import ContactMiddleware from '../middlewares/Contact';

const ContactRouter: express.Router = express.Router();

ContactRouter.get('/', ContactController.getContacts);
ContactRouter.delete('/:id', ContactMiddleware.validateId, ContactController.deleteContactById);
ContactRouter.patch(
  '/:id',
  ContactMiddleware.validateId,
  ContactMiddleware.validateContactName,
  ContactController.updateContactById,
);

export default ContactRouter;
