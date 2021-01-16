CREATE TABLE Users (
    userId int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    cpf varchar(20) NOT NULL,
    birthday DATE NOT NULL,
    PRIMARY KEY (userId)
);

CREATE TABLE Accounts (
    accountId int NOT NULL AUTO_INCREMENT,
    userId int NOT NULL,
    balance DECIMAL(18,2) NOT NULL,
    dailyLimit DECIMAL(14,2) NOT NULL,
    active BOOLEAN NOT NULL,
    type int NOT NULL,
    creationDate DATE NOT NULL,
    PRIMARY KEY (accountId),
    FOREIGN KEY (userId) REFERENCES Users(userId)
);

CREATE TABLE Transactions (
    transactionId int NOT NULL AUTO_INCREMENT,
    accountId int NOT NULL,
    value DECIMAL(14,2) NOT NULL,
    transactionDate DATE NOT NULL,
    PRIMARY KEY (transactionId),
    FOREIGN KEY (accountId) REFERENCES Accounts(accountId)
);

--SCRIPT PARA ADICIONAR UMA "pessoa" ao banco de dados mysql
INSERT INTO Users(name, cpf, birthday) VALUES ("Fulano Fulando", "02102102111", "1990/12/01")

-- SCRIPT PARA LISTA "PESSOAS" DO BD
SELECT * FROM Users
