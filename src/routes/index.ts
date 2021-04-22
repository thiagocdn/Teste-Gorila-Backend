import { Router } from 'express';
import cdbRouter from './cdb.routes';
import mainRouter from './main.routes';

const routes = Router();

routes.use('/', mainRouter);
routes.use('/cdb', cdbRouter);

export default routes;