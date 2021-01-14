module.exports = app => {
    const user = require("../controllers/userController.js");

    // Criar usuário
    app.post("/api/v1/users", user.create);

    // Buscar todos os usuários
    app.get("/api/v1/users", user.findAll);

};
