import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ContactController from '../controllers/Contact';

const ContactRouter: express.Router = express.Router();

ContactRouter.get(
  '/',
  ContactController.getContacts,
);

export default ContactRouter;
