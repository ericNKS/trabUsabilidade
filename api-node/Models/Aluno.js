const Sequelize = require('sequelize');
const db = require('./database');

const Aluno = db.define('aluno', {
    matricula: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    sala: {
        type: Sequelize.STRING(50),
        allowNull: true
    }
    
});

//Aluno.sync({ alter: true });

module.exports = Aluno