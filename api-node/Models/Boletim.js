const Sequelize = require('sequelize');
const db = require('./database');

const Boletim = db.define('boletin', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    matricula_aluno: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sala: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nota_final: {
        type: Sequelize.FLOAT,
        allowNull: false
    },aprovacao: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    
});

//Boletim.sync();

module.exports = Boletim