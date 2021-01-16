const Account = require("../models/accountModel.js");
const User = require("../models/userModel.js");
const Transaction = require("../models/transactionModel.js");
const { check, body, validationResult } = require('express-validator')


exports.create = async (req, res) => {
    const account = new Account({
        userId: req.body.userId,
        balance: req.body.balance,
        dailyLimit: req.body.dailyLimit,
        active: req.body.active || true,
        type: req.body.type
    });


    try {
        const userExists = await User.userExists(req.body.userId);
        if (!userExists) {
            res.status(404).send({
                message: "PESSOA INFORMADA NÃO EXISTE NA BASE. VERIFIQUE userId!"
            });
            return;
        }

        const response = await account.create();
        res.status(201).send(response);

    } catch (error) {
        res.status(500).send({
            message: error.message || "ERRO AO TENTAR CRIAR O USUÁRIO."
        });
    }

};


exports.getBalance = async (req, res) => {
    try {
        const balance = await Account.findBalanceByAccountId(req.params.accountId);
        if (balance) {
            res.send(balance);
        } else {
            res.status(404).send({ message: `NÃO ENCONTRAMOS A CONTA COM ID ${req.params.accountId}.` });
            return;
        }
    } catch (error) {
        res.status(500).send({ message: `ERRO AO TENTAR BUSCAR CONTA COM ID ${req.params.accountId}.` });
        return;
    }

};

// Altera o status da conta active (true|false)
exports.changeStatus = async (req, res) => {
    try {
        const accountChanged = await Account.updateStatusById(req.params.accountId, req.body.active);
        if (accountChanged) {
            res.send(accountChanged);
        } else {
            res.status(404).send({ message: `NÃO ENCONTRAMOS A CONTA COM ID ${req.params.accountId}.` });
        }
    } catch (error) {
        res.status(500).send({ message: "ERROR AO TENTEAR ATUALIZAR CONTA COM ID " + req.params.accountId });
    }
};

// transações saque e deposito
exports.transaction = async (req, res) => {
    const { accountId, value } = req.body;

    if (value == 0) {
        res.status(400).send({ message: "DEPOSITOS/SAQUES COM VALOR 0 NÃO SÃO VÁLIDOS" });
        return;
    }

    try {
        const account = await Account.getAccountById(accountId);

        if (!account) {
            res.status(400).send({ message: `NÃO ENCONTRAMOS A CONTA COM ID ${req.body.accountId}.` });
            return;
        }

        if (value > 0) {
            //deposito
            depositProcess(account, value, req, res);
        } else {
            //saque
            withdrawProcess(account, value, req, res);
        }
    } catch (error) {
        res.status(404).send({
            message: "CONTA NÃO ENCONTRADA PARA O ID " + accountId
        });
    }

};

depositProcess = async (account, value, req, res) => {
    var newBalance = account.balance + value;
    try {
        changedBalance = await Account.updateBalance(account.accountId, newBalance);
        createTransaction(account.accountId, value);
        res.status(200).send(changedBalance);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `ERRO AO TENTAR EFETUAR DEPOSITO NA CONTA ${account.accountId}.` });
        return;
    }
}


withdrawProcess = async (account, value, req, res) => {
    if (!account.active) {
        res.status(200).send({ message: "SAQUE NÃO REALIZADO, CONTA BLOQUEADA/DESATIVADA." });
        return;
    }

    if (account.balance < (value * -1)) {
        res.status(200).send({ message: "SAQUE NÃO REALIZADO, SALDO INSUFICIENTE." });
        return;
    }

    const limitExceeded = await checkLimitDaily(account.accountId, account.dailyLimit, value * -1);
    if (limitExceeded) {
        res.status(200).send({ message: "SAQUE NÃO REALIZADO, SAQUE EXCEDE O LIMITE DIARIO." });
        return;
    }

    const newBalance = account.balance + (value);
    try {
        changedBalance = await Account.updateBalance(account.accountId, newBalance);
        createTransaction(account.accountId, value);
        res.status(200).send(changedBalance);
        return;
    } catch (error) {
        res.status(500).send({ message: `ERRO AO TENTAR EFETUAR SAQUE NA CONTA ${account.accountId}.` });
        return;
    }

}

checkLimitDaily = async (accountId, dailyLimit, valueToGet) => {
    const amountWithdrawDaily = await Transaction.getAmountWithdrawDaily(accountId);
    return (amountWithdrawDaily * -1) + valueToGet > dailyLimit;
}

createTransaction = (accountId, value) => {
    const transaction = new Transaction({
        accountId,
        value
    });

    transaction.create()
}

exports.getTransactions = async (req, res) => {
    //transações por perido de dias
    if (req.query.period && !isNaN(req.query.period)) {
        var  startDate = new Date();
        startDate.setDate(startDate.getDate() - req.query.period);        
        const transactions = await Transaction.findTransactions(req.params.accountId, startDate)
        res.status(200).send(transactions);
    } else {
        //obter todas as transaçoes
        try {
            const transactions = await Transaction.findAllTransactions(req.params.accountId)
            res.status(200).send(transactions);
        } catch (error) {
            res.status(500).send({ message: "ERRO AO TENTAR BUSCAR TRANSAÇÕES DA CONTA " + req.params.accountId });
            return;
        }
    }


}


exports.createAccountRules = () => {
    return [
        body('userId').isInt(),
        body('balance').exists().isFloat(),
        body('dailyLimit').exists().isFloat(),
        body('active').exists().isBoolean(),
        body('type').exists().isInt()
    ]
}

exports.balanceAccountRules = () => {
    return [
        check('accountId').exists().isInt()
    ]
}

exports.changeStatusAccountRules = () => {
    return [
        check('active').exists().isBoolean(),
        check('accountId').exists().isInt()
    ]
}

exports.transactionRules = () => {
    return [
        body('accountId').exists().isInt(),
        body('value').exists().isFloat()
    ]
}

exports.accountValidate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    res.status(400).send({ message: "VERIFIQUE SUA REQUISIÇÃO!" });
    return;
}
