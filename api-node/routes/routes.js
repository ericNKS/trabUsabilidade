module.exports = (app) =>{
    app.route("/escolas")
        .get(app.Controller.EscolaController.get);
        //.post(app.Controller.EscolaController.save)
    app.route("/alunos")
        .get(app.Controller.AlunoController.get)
        .post(app.Controller.AlunoController.create)
        .put(app.Controller.AlunoController.save)

    app.route("/alunos/:matricula")
        .get(app.Controller.AlunoController.search)
        .delete(app.Controller.AlunoController.remove)

        
    app.route("/professor")
    .get(app.Controller.ProfessorController.get)
    .post(app.Controller.ProfessorController.create)
    .put(app.Controller.ProfessorController.save)

    app.route("/professor/:cpf")
    .get(app.Controller.ProfessorController.search)
    .delete(app.Controller.ProfessorController.remove)

    app.route("/boletim")
    .get(app.Controller.BoletimController.get)
    .post(app.Controller.BoletimController.create)
    .put(app.Controller.BoletimController.save)

    app.route("/boletim/:id")
    .get(app.Controller.BoletimController.search)

}