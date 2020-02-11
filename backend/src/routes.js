import { Router } from 'express';
// Controllers
import UsersController from './app/controllers/UsersController';
import RecipientsController from './app/controllers/RecipientsController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.get('/users', UsersController.index);
routes.post('/users', UsersController.store);

routes.post('/session', SessionController.store);

// ROTAS QUE REQUEREM AUTENTICAÇÃO
routes.use(authMiddleware);

routes.get('/recipients', RecipientsController.index);
routes.post('/recipients', RecipientsController.store);

export default routes;
