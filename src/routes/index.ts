import { Router } from 'express';
import cdbRouter from './cdb.routes';
import mainRouter from './main.routes';

const routes = Router();

// Rota principal apenas para checar se o servidor esta OK.
routes.use('/', mainRouter);

// Rota de calculo do CDB -> arquivo (/src/routes/cdb.routes.ts)
routes.use('/cdb', cdbRouter);

export default routes;