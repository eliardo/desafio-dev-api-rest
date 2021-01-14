module.exports = app => {
    const account = require("../controllers/accountController.js");

    // Criar uma conta
    app.post("/api/v1/account", account.create);

    //Obter saldo de uma conta
    app.get("/api/v1/account/balance/:accountId", account.getBalance);

    //Ativar/desativar conta
    app.put("/api/v1/account/:accountId", account.changeStatus);

    //Transações (deposito e saque)
    app.post("/api/v1/account/transaction", account.transaction);

};
