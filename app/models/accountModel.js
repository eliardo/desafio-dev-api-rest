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

    create = (result) => {
        sql.query("INSERT INTO Accounts SET ?", this, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created account: ", { id: res.insertId, ...this });
            result(null, { id: res.insertId, ...this });
        });
    }

    static findBalanceByAccountId = (accountId, result) => {
        sql.query(`SELECT balance FROM Accounts WHERE accountId = ${accountId}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found account: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found Account with the id
            result({ statusCode: "404" }, null);
        });
    }

    static updateById = (id, active, result) => {
        sql.query(
            "UPDATE Accounts SET active = ? WHERE accountId = ?",
            [active, id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found Account with the id
                    result({ statusCode: "404" }, null);
                    return;
                }

                console.log("updated account: ", { accountId: id, active: active });
                result(null, { accountId: id, active: active });
            }
        );
    }
}

module.exports = Account;
