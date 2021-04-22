import { Router } from 'express';
import cdbRouter from './cdb.routes';

const routes = Router();

routes.use('/cdb', cdbRouter);

export default routes;