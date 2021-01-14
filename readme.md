
## Project setup
```
npm install
```

### Run
```
node server.js
```

### Descrição
Serviço responsável por gerenciar contas, possibilitando criar contas, bloquear contas, realizar saques depósitos e obter extratos. 
Atualmente possuí também as funcionalidades de criar pessoa e listar todas as pessoas (funcionalidade que deve ser removida para na causar dupla responsabilidade)

## Swagger
Swagger implementado e disponível em /index

## Contas

Tabela Accounts

    | Campos | Tipo | descrição
    |-|-|-|
    | accountId | Numérico | Id da conta gerado automaticamente |
    | userId | Numérico | Id da pessoa, chave estrangeira da tabela Users |
    | balance | Monetário | Saldo da conta|
    | dailyLimit | Monetário | limite de saque diario |
    | active | Condicional | flag ativo, identifica se a conta está bloqueada ou ativa |
    | type | Numérido | tipo da conta |
    | creationDate | Data | data criacao da conta (identificada automaticamente) |


### Criar contas
```
POST /api/v1/account

{
  "userId": 1,
  "balance": 0,
  "dailyLimit": 1000,
  "active": true,
  "type": 0
}


```


### Bloquear / Ativar conta
```
PUT /api/v1/account/{accountId}

{
  "active": true or false
}

```


### Consultar saldo
```
GET /api/v1/account/balance/{accountId}

```

### Saques de uma conta
#todo

### Depositos de uma conta
#todo

### Extratos
#todo

## Pessoas

Tabela Users

    | Campos | Tipo | Descrição |
    |-|-|-|
    | userId | Numérico | Id da pessoa, gerado automaticamente |
    | name | Texto | nome da pessoa |
    | cpf | Texto | CPF da pessoa |
    | birthday | Data | Data de nascimento |


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
