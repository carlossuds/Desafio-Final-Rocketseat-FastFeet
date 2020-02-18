import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
// Controllers
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.post('/session', SessionController.store);

// ROTAS QUE REQUEREM AUTENTICAÇÃO
routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
