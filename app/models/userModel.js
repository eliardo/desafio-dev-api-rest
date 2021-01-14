const sql = require("./db.js");

class User {
    constructor(user) {
        this.name = user.name;
        this.cpf = user.cpf;
        this.birthday = user.birthday;
    }

    create = (newUser, result) => {
        sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created user: ", { id: res.insertId, ...newUser });
            result(null, { id: res.insertId, ...newUser });
        });
    }

    getAll = result => {
        sql.query("SELECT * FROM Users", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("Users: ", res);
            result(null, res);
        });
    }

}

module.exports = User;
