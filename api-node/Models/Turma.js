const Sequelize = require('sequelize');
const db = require('./database');

const Turma = db.define('turma', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    sala: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    professores: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
    
});

//Turma.sync();

module.exports = Turma