const User = require("../models/userModel.js");

// cria um novo usuário na base de dados
exports.create = (req, res) => {
    if (!req.body || (!req.body.name || !req.body.cpf || !req.body.birthday) ) {
        res.status(400).send({
            message: "VERIFIQUE OS DADOS INFORMADOS!!"
        });
    }

    const user = new User({
        name: req.body.name,
        cpf: req.body.cpf,
        birthday: req.body.birthday
    });

    User.create(user, (error, data) => {
        if (error)
            res.status(500).send({
                message:
                error.message || "ERRO AO TENTAR CRIAR O USUÁRIO."
            });
        else res.status(201).send(data);
    });
};

// busca todos os usuários cadastrados
exports.findAll = (req, res) => {
    User.getAll((error, data) => {
        if (error)
            res.status(500).send({
                message:
                error.message || "ERRO AO BUSCAR TODOS OS USUÁRIOS."
            });
        else res.status(200).send(data);
    });
};

