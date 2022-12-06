const Professores = require('../models/Professor')

module.exports = (app) =>{
    const get = async(req, res) =>{
        
        const professores = await Professores.findAll({
            attributes: [
                'nome', 'cpf', 'tituloAcad', 'disciplina'
              ]
        }).then((professor)=>{
            return res.json(professor);
        }).catch((error)=>{
            return console.log(error);
        })

        

    }
    const search = async(req, res)=>{
        const professores = await Professores.findOne({
              where:{
                cpf: req.params.cpf
              }
        })
        if(professores === null){
            return res.json({status:"true"});
        }else{
            return res.json({status:"false"});
        }
    }
    const remove = async (req, res)=>{


        const professores = await Professores.destroy({
            where: {
                cpf: req.params.cpf
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
        await Professores.create(user).then(()=>{
            return res.send(true)
        })

        /*

            nome: 'Esdras',
            cpf: '09663336595',
            tituloAcad: 'Pós-Graduação',
            disciplina: 'Português'

        */
    }

    const save = async(req,res) =>{
        
        const professor = await Professores.findOne({
            where:{
                cpf: req.body.cpf
            }
        })
        const user = req.body;
        professor.set(user);
        await professor.save().then(()=>{
            return res.send("ok")
        })
        //console.log(req.params.matricula);
        
    }





    return { get, save, remove, search, create };
}