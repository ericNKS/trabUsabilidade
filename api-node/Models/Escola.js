const Sequelize = require('sequelize');
const db = require('./database');

const Escola = db.define('escola', {
    cnpj: {
        type: Sequelize.STRING(100),
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    cep: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    numero: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    rua: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    complemento: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
    
});

//Escola.sync();

module.exports = Escola