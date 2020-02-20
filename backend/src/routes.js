import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
// Controllers
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import CourierController from './app/controllers/CourierController';
import OrderController from './app/controllers/OrderController';

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

routes.get('/couriers', CourierController.index);
routes.post('/couriers', CourierController.store);
routes.put('/couriers/:id', CourierController.update);
routes.delete('/couriers/:id', CourierController.destroy);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.get('/couriers/:id/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);
routes.put('/orders/:id/:cancel', OrderController.update);

routes.post('/files', upload.single('file'), FileController.store);
routes.get('/files', FileController.index);

export default routes;
