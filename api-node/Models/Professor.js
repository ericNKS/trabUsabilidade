const Sequelize = require('sequelize');
const db = require('./database');

const Professor = db.define('professor', {
    cpf: {
        type: Sequelize.STRING(15),
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    tituloAcad: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    disciplina: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
    
});

Professor.sync({ alter: true });

module.exports = Professor