const Account = require("../models/accountModel.js");

// cria um novo usuário na base de dados
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "VERIFIQUE OS DADOS INFORMADOS!"
        });
    }

    const account = new Account({
        userId: req.body.userId,
        balance: req.body.balance,
        dailyLimit: req.body.dailyLimit,
        active: req.body.active || true,
        type: req.body.type
    });

    account.create((error, data) => {
        if (error)
            res.status(500).send({
                message:
                    error.message || "ERRO AO TETNAR CRIAR CONTA."
            });
        else res.status(201).send(data);
    });
};


exports.getBalance = (req, res) => {

    if (!req.params.accountId || isNaN(req.params.accountId)) {
        res.status(400).send({
            message: "VERIFIQUE OS DADOS INFORMADOS!"
        });
        return;
    }

    Account.findBalanceByAccountId(req.params.accountId, (error, data) => {
        if (error) {
            if (error.statusCode === "404") {
                res.status(404).send({
                    message: `NÃO ENCONTRAMOS A CONTA COM ID ${req.params.accountId}.`
                });
            } else {
                res.status(500).send({
                    message: "ERRO AO TENTAR BUSCAR CONTA COM ID " + req.params.accountId
                });
            }
        } else res.send(data);
    });
};

// Altera o status da conta active (true|false)
exports.changeStatus = (req, res) => {
    if (!req.params.accountId || isNaN(req.params.accountId)
        || (req.body.active != false && req.body.active != true)) {

        res.status(400).send({
            message: "VERIFIQUE OS DADOS INFORMADOS!"
        });
        return;
    }
    const active = req.body.active;
    Account.updateById(
        req.params.accountId,
        active,
        (err, data) => {
            if (err) {
                if (err.statusCode === "404") {
                    res.status(404).send({
                        message: `NÃO ENCONTRAMOS A CONTA COM ID ${req.params.accountId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "ERROR AO TENTEAR ATUALIZAR CONTA COM ID " + req.params.accountId
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
};

// transações saque e deposito
exports.transaction = (req, res) => {
    //buscar conta
        //verificar se está ativa
            //identificar se é saque comparar com o saldo
                //sacar
                    //devolver o saldo atual
            //depositar
                //devolver o saldo atual
};

