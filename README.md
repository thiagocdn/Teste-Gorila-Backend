# Sobre a aplicação

+ Essa aplicação foi desenvolvida através do enunciado:

https://www.notion.so/Teste-para-desenvolvedor-back-end-pleno-fd5b6e07475e4af3bc99342c15bb3edc

Use o enunciado como referência para um melhor entendimento sobre sua funcionalidade.


## Deploy e Disponibilidade

Essa aplicação está disponível na seguinte URL:

https://gorila-backend.herokuapp.com/

Leia a seção **Rotas de utilização** para saber como usar a rota de cálculo


## Instalação Local

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

Atenção: a porta padrão utilizada é a 8000, logo a aplicação deve rodar em http://localhost:8000/

## Rotas de utilização

Esse programa é constituido de uma rota para o cálculo de investimento pós-fixado atrelado ao CDI, conforme informado no enunciado;

- Para obter o resultado, faça uma requisição do tipo *POST* para a rota "/cdb".
- No corpo da requisição é necessário informar as datas de início e fim do investimento (investmentDate e currentDate, respectivamente) e a % do CDI do investimento (cdbRate)

ex.: POST https://gorila-backend.herokuapp.com/cdb
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

## Testes

+ Essa aplicação consta com testes para suas principais funções desenvolvidos com o JEST. Para rodas os testes, apenas rode o comando:
+ 
```
npm run test
```
ou
```
yarn test
```

e você terá o resultado dos testes automatizados das funções:

![image](https://user-images.githubusercontent.com/61380775/115892571-a7c32600-a42d-11eb-811c-ed83f6721790.png)

## Resultados e Tratativa de Erros

+ Caso seja feito uma requisição corretamente, conforme proposto na seção **Rotas de utilização**, você receberá o retorno correto com o array de evolução do investimento:

![image](https://user-images.githubusercontent.com/61380775/115893375-7bf47000-a42e-11eb-83e3-8a624c13162b.png)

+ Caso você envie uma data inválida dentro do investmentDate, ele retornará um erro 400 - Bad Request, indicando para checar esse campo da requisição:

![image](https://user-images.githubusercontent.com/61380775/115893418-8878c880-a42e-11eb-8209-9901ad115097.png)

+ O mesmo ocorre para o currentDate:

![image](https://user-images.githubusercontent.com/61380775/115893464-9595b780-a42e-11eb-9e78-991f03931e5a.png)

+ E caso você envie um cdbRate que não seja um numero, o retorno também indicará para você checar esse valor:

![image](https://user-images.githubusercontent.com/61380775/115893570-b8c06700-a42e-11eb-8aaf-2b30a1520d06.png)

