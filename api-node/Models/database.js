const dbHost = "localhost";
const db = 'api_node';
const dbUser = 'root';
const dbPassword = '';

const Sequelize = require('sequelize');
const conn = new Sequelize(db, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql'
});

conn.authenticate()
.then(()=>{
    console.log("Conexão com o bando de dados realizado com sucesso!");
}).catch(()=>{
    console.log("Error: Conexão com o banco de dados não realizado")
})
module.exports = conn;