# Sobre a aplicação

+ Essa aplicação foi desenvolvida através do enunciado:

https://www.notion.so/Teste-para-desenvolvedor-back-end-pleno-fd5b6e07475e4af3bc99342c15bb3edc

Use o enunciado como referência para um melhor entendimento sobre sua funcionalidade.

## Instalação

- Para rodar em sua máquina, clone o repositório através do terminal:
```
git clone https://github.com/thiagocdn/Teste-Gorila-Backend.git
```

- Entre na pasta onde o repositório foi clonado e instale as dependências:

#### Yarn
```
yarn
```
ou
```
yarn install
```

#### NPM
```
npm i
```
ou
```
npm install
```

- Para rodar a aplicação simplesmente execute no terminal, na pasta onde esta configurado o repositorio:

#### Yarn
```
yarn dev
```
#### NPM
```
npm run dev
```
## Rotas de utilização
Esse programa é constituido de uma rota para o cálculo de investimento pós-fixado atrelado ao CDI, conforme informado no enunciado;

- Para obter o resultado, faça uma requisição do tipo *POST* para a rota "/cdb".
- No corpo da requisição é necessário informar as datas de início e fim do investimento (investmentDate e currentDate, respectivamente) e a % do CDI do investimento (cdbRate)

ex.: POST http://localhost:3333/cdb
Request Body:
```JSON
{
    "investmentDate":"2016-11-16",
    "cdbRate": 115.3,
    "currentDate":"2016-12-15"
}
```

Caso a sua requisição seja feita e processada corretamente, você deverá receber como resposta um array da evolução do investimento da data inicial ate a data final selecionada contendo, em cada objeto, a data e o valor da unidade que inicia em 1000.
ex.:
```JSON
[
  {
    "date": "2016-11-16",
    "unitPrice": 1000.59
  },
  {
    "date": "2016-11-17",
    "unitPrice": 1001.19
  },
  {
    "date": "2016-11-18",
    "unitPrice": 1001.78
  },
  {
    "date": "2016-11-21",
    "unitPrice": 1002.38
  },
  {
    "date": "2016-11-22",
    "unitPrice": 1002.97
  },
  {
    "date": "2016-11-23",
    "unitPrice": 1003.57
  },
  {
    "date": "2016-11-24",
    "unitPrice": 1004.17
  },
  {
    "date": "2016-11-25",
    "unitPrice": 1004.76
  },
  {
    "date": "2016-11-28",
    "unitPrice": 1005.36
  },
  {
    "date": "2016-11-29",
    "unitPrice": 1005.96
  },
  {
    "date": "2016-11-30",
    "unitPrice": 1006.56
  },
  {
    "date": "2016-12-01",
    "unitPrice": 1007.15
  },
  {
    "date": "2016-12-02",
    "unitPrice": 1007.74
  },
  {
    "date": "2016-12-05",
    "unitPrice": 1008.32
  },
  {
    "date": "2016-12-06",
    "unitPrice": 1008.91
  },
  {
    "date": "2016-12-07",
    "unitPrice": 1009.5
  },
  {
    "date": "2016-12-08",
    "unitPrice": 1010.09
  },
  {
    "date": "2016-12-09",
    "unitPrice": 1010.69
  },
  {
    "date": "2016-12-12",
    "unitPrice": 1011.28
  },
  {
    "date": "2016-12-13",
    "unitPrice": 1011.87
  },
  {
    "date": "2016-12-14",
    "unitPrice": 1012.46
  }
]
```
