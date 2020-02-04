import { Router } from 'express';
// Controllers

import authMiddleware from './app/middleware/auth';

const routes = new Router();

// ROTAS QUE REQUEREM AUTENTICAÇÃO
routes.use(authMiddleware);

export default routes;
