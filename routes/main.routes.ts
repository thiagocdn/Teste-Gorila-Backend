import { Router } from 'express';

const mainRouter = Router();

// Rota principal para testar se o servidor esta OK pelo browser.
mainRouter.get('/', async (_, response) => {
  return response.send('Connected');
});


export default mainRouter;