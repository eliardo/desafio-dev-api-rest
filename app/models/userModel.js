const sql = require("./db.js");

class User {
    constructor(user) {
        this.name = user.name;
        this.cpf = user.cpf;
        this.birthday = user.birthday;
    }

    create(){
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO Users SET ?", this, (err, res) => {
                if (err) {
                    reject(err.message);
                }
                console.log("created user: ", { id: res.insertId, ...this });
                resolve({ id: res.insertId, ...this });
            });
        });
    }

    static getAll(){
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM Users", (err, res) => {
                if (err) {
                    reject(err.message);
                }
                console.log("Users: ", res);
                resolve(res);
            });
        });
    }

    static async userExists(userId) {
        try {
            const user = await User.getOne(userId) 
            return user[0].userId == userId;
        } catch (error) {
            return false;
        }
    }

    static getOne(userId){
        return new Promise((resolve, reject) => {
            sql.query(`SELECT * FROM Users WHERE userId = ${userId}`, (err, res) => {
                if (err) {
                    reject(err.message);
                }
                console.log("User: ", res);
                resolve(res);
            });
        });
    }
}

module.exports = User;
