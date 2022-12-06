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
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    sala: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
    
});

//Aluno.sync();

module.exports = Aluno