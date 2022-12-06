const express = require('express');
const consign = require('consign')
const app = express();
const cors = require('cors');
const Escola = require('./models/Escola')

const database = require('./models/database');

app.use((req,res, next)=>{
    res.header("Access-Control-Allow-Origin","*")
    app.use(cors())
    next()
})
app.use(express.json())
app.database = database;

consign()
    .then("./Controller")
    .then("./routes/routes.js")
    .into(app)


app.listen(5001);