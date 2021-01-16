const sql = require("./db.js");

// constructor
class Account {

    constructor(account) {
        this.userId = account.userId;
        this.balance = account.balance;
        this.dailyLimit = account.dailyLimit;
        this.active = account.active;
        this.type = account.type;
        this.creationDate = new Date().toJSON().slice(0, 10);
    }

    create() {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO Accounts SET ?", this, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                } else {
                    console.log("created account: ", { id: res.insertId, ...this });
                    resolve({ id: res.insertId, ...this });
                }
            });
        });
    }

    static findBalanceByAccountId = (accountId) => {
        return new Promise((resolve, reject) => {
            sql.query(`SELECT balance FROM Accounts WHERE accountId = ${accountId}`, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }

                if (res.length) {
                    console.log("found account: ", res[0]);
                    resolve(res[0]);
                } else {
                    resolve(null);
                }
            });
        });
    }

    static updateStatusById = (id, active) => {
        return new Promise((resolve, reject) => {
            sql.query("UPDATE Accounts SET active = ? WHERE accountId = ?", [active, id],
                (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        reject(err);
                        return;
                    }

                    if (res.affectedRows == 0) {
                        // not found Account with the id
                        resolve(null);
                        return;
                    }

                    console.log("updated account: ", { accountId: id, active: active });
                    resolve({ accountId: id, active: active });
                }
            );
        });
    }

    static updateBalance = (accountId, balance) => {
        return new Promise((resolve, reject) => {
            sql.query("UPDATE Accounts SET balance = ? WHERE accountId = ?", [balance, accountId],
                (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        reject(err);
                        return;
                    }

                    if (res.affectedRows == 0) {
                        // not found Account with the accountId
                        resolve(null);
                        return;
                    }

                    console.log("updated account: ", { accountId: accountId, balance: balance });
                    resolve({ accountId: accountId, balance: balance });
                }
            );
        });
    }

    static getAccountById = (accountId) => {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM Accounts WHERE accountId = ? ", accountId, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }

                if (res.length) {
                    console.log("found account: ", res[0]);
                    resolve(res[0]);
                } else {
                    resolve(null);
                }

            });
        });
    }
}

module.exports = Account;
