import { Router } from 'express';
import MessageController from '../controllers/message.controller';

const messageRouter = Router();

messageRouter.get('/', MessageController.getAllMessages);

messageRouter.post('/', MessageController.createMessage);

export default messageRouter;
