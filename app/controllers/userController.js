const User = require("../models/userModel.js");

// cria um novo usuário na base de dados
exports.create = async (req, res) => {
    if (!req.body || (!req.body.name || !req.body.cpf || !req.body.birthday) ) {
        res.status(400).send({
            message: "VERIFIQUE OS DADOS INFORMADOS!!"
        });
        return;
    }

    const user = new User({
        name: req.body.name,
        cpf: req.body.cpf,
        birthday: req.body.birthday
    });

    try {
        const response = await user.create();
        res.status(201).send(response);
    } catch (error) {
        res.status(500).send({
            message: error.message || "ERRO AO TENTAR CRIAR O USUÁRIO."
        });
    }

};

// busca todos os usuários cadastrados
exports.findAll = async (req, res) => {
    try {
        const users = await User.getAll();    
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({
            message: error.message || "ERRO AO BUSCAR TODOS OS USUÁRIOS."
        });
    }
};

