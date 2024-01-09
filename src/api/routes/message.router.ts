import { Router } from 'express';
import MessageController from '../controllers/message.controller';

const messageRouter = Router();

// messageRouter.get('/', MessageController.getAll);

messageRouter.post('/', MessageController.create);

export default messageRouter;
