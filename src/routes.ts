import { Router } from 'express';
import { MessagesController } from './controllers/MessagesController';
import { SettingControlle } from './controllers/SettingController';
import { UsersController } from './controllers/UsersController';

export const routes = Router();

const settingController = new SettingControlle();
const usersController = new UsersController();
const messagesController = new MessagesController();

routes.post( '/settings', settingController.create );
routes.get( '/settings/:username', settingController.findByUsername );
routes.put( '/settings/:username', settingController.update );


routes.post('/users', usersController.create);

routes.post('/messages', messagesController.create);
routes.get('/messages/:id', messagesController.showByUser);
