
## Project setup
```
npm install
```

### Run
```
node server.js
```

### Descrição
Serviço responsável por gerenciar contas, possibilitando criar contas, bloquear contas, realizar saques depósitos e obter extratos. <br />
Atualmente possuí também as funcionalidades de criar pessoa e listar todas as pessoas (funcionalidade que deve ser removida para na causar dupla responsabilidade)

## Swagger
Swagger implementado e disponível em /index<br />
Acesse /index e terá de maneira visual os endpoints disponíveis na API, cada um com seus requests e possíveis responses

## Contas

Tabela Accounts

    | Campos       | Tipo        | Descrição                                                 |
    | ---          | ---         | ---                                                       |
    | accountId    | Numérico    | Id da conta gerado automaticamente                        |
    | userId       | Numérico    | Id da pessoa, chave estrangeira da tabela Users           |
    | balance      | Monetário   | Saldo da conta                                            |
    | dailyLimit   | Monetário   | limite de saque diario                                    |
    | active       | Condicional | Flag ativo, identifica se a conta está bloqueada ou ativa |
    | type         | Numérido    | Tipo da conta                                             |
    | creationDate | Data        | Data criacao da conta (identificada automaticamente)      |


### Criar contas
```
POST /api/v1/account

{
  "userId": 1,
  "balance": 100.90,
  "dailyLimit": 1000,
  "active": true,
  "type": 0
}


```

**Response**
```
{
    "id": 1,
    "userId": 1,
    "balance": 100.90,
    "dailyLimit": 1000,
    "active": true,
    "type": 1,
    "creationDate": "2021-01-15"
}
```

### Bloquear / Ativar conta
```
PUT /api/v1/account/{accountId}

{
  "active": true or false
}

```
Envie active true para ativar a conta, ou active false para bloquear a conta

**Response**
```
{
    "accountId": "3",
    "active": true
}
```

### Consultar saldo
```
GET /api/v1/account/balance/{accountId}

```

**Response**
```
{
    "balance": 200.9
}
```


### Transações Saques e Depósitos de uma conta
```
POST /api/v1/account/transaction

Depósito
{
    "accountId": 1,
    "value": 100
}

Saque
{
    "accountId": 1,
    "value": -100
}

```
Envie um valor positivo na propriedade value para realizar um depósito, ou envie um valor negativo para realizar um saque.

**Response**
```
{
    "accountId": 1,
    "balance": 101.9
}
```

### Extratos
```
GET /api/v1/account/transaction/{accountId}
```

**Response**
```
[
    {
        "transactionId": 1,
        "accountId": 1,
        "value": 100,
        "transactionDate": "2021-01-15"
    },
    {
        "transactionId": 2,
        "accountId": 1,
        "value": -50,
        "transactionDate": "2021-01-15"
    }
]    
```



## Pessoas

Tabela Users

    | Campos   | Tipo     | Descrição                            |
    | ---      | ---      | ---                                  |
    | userId   | Numérico | Id da pessoa, gerado automaticamente |
    | name     | Texto    | Nome da pessoa                       |
    | cpf      | Texto    | CPF da pessoa                        |
    | birthday | Data     | Data de nascimento                   |


### Criar pessoa
```
POST /api/v1/user

{
  "name": "teste",
  "cpf": "01224422",
  "birthday" : "1990/12/01"
}


```


### Listar todas pessoas cadastradas
```
GET /api/v1/user

```


### Banco de dados
Banco de dados utilizado é foi MYSQL.

**Scripts de criação de tabelas disponível em app/scripts/db.sql**
