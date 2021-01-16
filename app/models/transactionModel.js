const sql = require("./db.js");

class Transaction {
    constructor(transaction) {
        this.accountId = transaction.accountId;
        this.value = transaction.value;
        this.transactionDate = new Date().toJSON().slice(0, 10);
    }

    create() {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO Transactions SET ?", this, (err, res) => {
                if (err) {
                    reject(err.message);
                }
                console.log("created transaction: ", { id: res.insertId, ...this });
                resolve({ id: res.insertId, ...this });
            });
        });
    }


    static findAllTransactions(accountId) {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM Transactions WHERE accountId = ? ", accountId, (err, res) => {
                if (err) {
                    reject(err.message);
                }
                resolve(res);
            });
        });
    }

    static findTransactions(accountId, period) {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM Transactions WHERE accountId = ? and transactionDate > ?", [accountId, period], (err, res) => {
                if (err) {
                    reject(err.message);
                }
                resolve(res);
            });
        });
    }

    static getAmountWithdrawDaily = (accountId) => {
        return new Promise((resolve, reject) => {
            const today = new Date().toJSON().slice(0, 10);
            sql.query(`SELECT sum(value) as 'sum' FROM Transactions WHERE value < 0 and accountId = ${accountId} and transactionDate = '${today}'`, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                resolve(res[0].sum);

            });
        });
    }
}

module.exports = Transaction;
