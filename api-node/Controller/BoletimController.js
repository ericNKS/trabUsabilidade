const Boletim = require('../models/Boletim')
const { Op } = require("sequelize");
module.exports = (app) =>{
    const get = async(req, res) =>{
        
        const boletins = await Boletim.findAll({
            attributes: [
                'matricula', 'turma',  'notaFinal', 'aprovacao', 'id'
              ]
        }).then((boletim)=>{
            return res.json(boletim);
        }).catch((error)=>{
            return console.log(error);
        })

        

    }
    const search = async(req, res)=>{
        const boletim = await Boletim.findOne({
              where:{
                id: req.params.id
              }
        }).then((resp)=>{
            console.log(resp);
            if(resp === null){
                console.log("Sem Boletim no banco");
                return res.json({status:"true"});
            }else{
                console.log("Com Boletim no banco");
                return res.json({status:"false"});
            }
        }).catch((e)=>{
            console.log(e);
        })
        
    }

    const create = async (req,res) =>{
        const user = req.body;
        console.log(user);
        await Boletim.create(user).then(()=>{
            return res.send(true)
        })
    }

    const save = async(req,res) =>{
        
        const boletim = await Boletim.findOne({
            where:{
              id: req.body.id
            }
        })
        const user = req.body;
        console.log(user);
        boletim.set(user);
        await boletim.save().then(()=>{
            return res.send("ok")
        })
        //console.log(req.params.matricula);
        
    }





    return { get, save, search, create };
}