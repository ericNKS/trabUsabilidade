const Boletim = require('../models/Turma')
const db = require('../models/database')
const Sequelize = require("sequelize");
const { QueryTypes } = Sequelize;
module.exports = (app) =>{
    const get = async(req, res) =>{
        
        /*const boletins = await Boletim.findAll({
            attributes: [
                'matricula', 'turma',  'notaFinal', 'aprovacao', 'id'
              ]
        }).then((boletim)=>{
            return res.json(boletim);
        }).catch((error)=>{
            return console.log(error);
        })
*/
        
    const query = await db.query(
        `
        SELECT
            t.id, p.nome as professores, p.disciplina as disciplinas, a.nome as alunos, t.sala, a.matricula as matriculaAluno
        FROM
            turmas as t left join professors as p on (t.professores = p.cpf) left join alunos as a on (t.sala = a.sala)

        `,{type: QueryTypes.SELECT}
    ).then((boletim)=>{
        return res.json(boletim);
    }).catch((error)=>{
        console.log("**************** ERRORRRR *********************");
        return console.log(error);
    });


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

        const query = await db.query(
            `
            INSERT INTO
                turmas(professores,sala)
            VALUES('${user.professores}','${user.sala}')
    
            `,{type: QueryTypes.INSERT}
        ).then((boletim)=>{
            return res.json({ok:true});
        }).catch((error)=>{
            console.log("**************** ERRORRRR *********************");
            return console.log(error);
        });
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

    const remove = async(req,res)=>{

        const query = await db.query(
            `
            DELETE FROM 
                turmas
            WHERE
                id = ${req.params.id}
    
            `,{type: QueryTypes.DELETE}
        ).then((boletim)=>{
            return res.json({ok:true});
        }).catch((error)=>{
            console.log("**************** ERRORRRR *********************");
            return console.log(error);
        });
    }



    return { get, save, remove, create };
}