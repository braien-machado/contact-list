import express from 'express';
import PhoneController from '../controllers/Phone';
import PhoneMiddleware from '../middlewares/Phone';

const PhoneRouter: express.Router = express.Router();

PhoneRouter.delete('/:id', PhoneMiddleware.validateId, PhoneController.deletePhoneById);
PhoneRouter.patch(
  '/:id',
  PhoneMiddleware.validateId,
  PhoneMiddleware.validatePhoneBody,
  PhoneMiddleware.validatePhoneNumber,
  PhoneMiddleware.validateWhatsappBool,
  PhoneController.updatePhoneById,
);
PhoneRouter.post(
  '/',
  PhoneMiddleware.validateCreatePhoneBody,
  PhoneMiddleware.validateOwnerId,
  PhoneMiddleware.validatePhoneNumber,
  PhoneMiddleware.validateWhatsappBool,
  PhoneController.createPhone,
);

export default PhoneRouter;
