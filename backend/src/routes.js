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
import OrderProblemController from './app/controllers/OrderProblemController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Usuários (Admins)
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

// Session
routes.post('/session', SessionController.store);

// ROTAS QUE REQUEREM AUTENTICAÇÃO
routes.use(authMiddleware);
// Destinatários
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);

// Entregadores
routes.get('/couriers', CourierController.index);
routes.post('/couriers', CourierController.store);
routes.put('/couriers/:id', CourierController.update);
routes.delete('/couriers/:id', CourierController.destroy);

// Encomenda de um Entregador
routes.get('/couriers/:id/orders', OrderController.index);
routes.get('/couriers/:id/orders/:ended', OrderController.index);

// Encomenda
routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

// Problemas de um Pedido
routes.get('/orders/:id/problems', OrderProblemController.index);
routes.post('/orders/:id/problems', OrderProblemController.store);

routes.put('/problem/:id/cancel-order', OrderProblemController.update);

// Arquivos
routes.post('/files', upload.single('file'), FileController.store);
routes.get('/files', FileController.index);

export default routes;
