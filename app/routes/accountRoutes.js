module.exports = app => {
    const account = require("../controllers/accountController.js");

    // Criar uma conta
    app.post("/api/v1/account", account.createAccountRules(), account.accountValidate, account.create);

    //Ativar/desativar conta
    app.put("/api/v1/account/:accountId", account.changeStatusAccountRules(), account.accountValidate, account.changeStatus);
    
    //Obter saldo de uma conta
    app.get("/api/v1/account/balance/:accountId", account.balanceAccountRules(), account.accountValidate, account.getBalance);

    //Transações (deposito e saque)
    app.post("/api/v1/account/transaction", account.transactionRules(), account.accountValidate, account.transaction);

    //Transações (todos os extratos)
    app.get("/api/v1/account/transaction/:accountId", account.getAllTransactions);

};
