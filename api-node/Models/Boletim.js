const Sequelize = require('sequelize');
const db = require('./database');

const Boletim = db.define('boletin', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    matricula: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    turma: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    notaFinal: {
        type: Sequelize.FLOAT,
        allowNull: false
    },aprovacao: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    
});

//Boletim.sync({ alter: true });

module.exports = Boletim