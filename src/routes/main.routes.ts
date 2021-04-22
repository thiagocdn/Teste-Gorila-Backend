import { Router } from 'express';

const mainRouter = Router();


mainRouter.get('/', async (_, response) => {
  return response.send('Connected');
});


export default mainRouter;