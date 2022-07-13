import express from 'express';
import ContactController from '../controllers/Contact';

const ContactRouter: express.Router = express.Router();

ContactRouter.get('/', ContactController.getContacts);

export default ContactRouter;
