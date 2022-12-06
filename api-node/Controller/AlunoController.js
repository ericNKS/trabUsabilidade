const Alunos = require('../models/Aluno')

module.exports = (app) =>{
    const get = async(req, res) =>{
        
        const alunos = await Alunos.findAll({
            attributes: [
                'nome', 'cpf', 'matricula', 'sala'
              ]
        }).then((aluno)=>{
            return res.json(aluno);
        }).catch((error)=>{
            return console.log(error);
        })

        

    }
    const search = async(req, res)=>{
        const alunos = await Alunos.findOne({
              where:{
                matricula: req.params.matricula
              }
        })
        if(alunos === null){
            console.log("Sem aluno no banco");
            return res.json({status:"true"});
        }else{
            console.log("Com aluno no banco");
            return res.json({status:"false"});
        }
    }
    const remove = async (req, res)=>{


        const alunos = await Alunos.destroy({
            where: {
                matricula: req.params.matricula
            },
            force: true
          }).then(()=>{
            return res.send("ok")
          }).catch(e=>{
            return res.status(400)
          })

        
    }

    const create = async (req,res) =>{
        const user = req.body;
        await Alunos.create(user).then(()=>{
            return res.send(true)
        })
    }

    const save = async(req,res) =>{
        
        const alunos = await Alunos.findOne({
            where:{
              matricula: req.body.matricula
            }
        })
        const user = req.body;
        console.log(user);
        alunos.set(user);
        await alunos.save().then(()=>{
            return res.send("ok")
        })
        //console.log(req.params.matricula);
        
    }





    return { get, save, remove, search, create };
}