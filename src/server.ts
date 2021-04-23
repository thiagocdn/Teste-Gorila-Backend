import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da aplicação (arquivo /src/routes/index.ts)
app.use(routes);

//Server rodando na porta setada nas variaveis ambiente, caso nao exista,
// rodar na porta 8000.
app.listen(process.env.PORT || 8000, () => {
  console.log('Server is up!')
})