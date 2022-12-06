const teste = require('../models/Escola')
const professor = require('../models/Aluno')

module.exports = (app) =>{
    const get = async(req, res) =>{
        const Users = [
            {
                'id' : 1,
                'name': 'Eric'
            },
            {
                'id' : 2,
                'name': 'Gerson'
            }
        ];
        
        
        const users = await teste.findAll().then((escolas)=>{
            return res.json(escolas);
        }).catch((error)=>{
            return res.send("ERROR")
        })

        

    }

    
    const save = async (req,res) =>{
        const user = { ...req.body };
        await teste.create(req.body )
        return res.json(user)
    }

    return { get, save };
}