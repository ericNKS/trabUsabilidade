import React from "react"
import {Table, Button, Form, Modal} from 'react-bootstrap';


class Turmas extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            professores: '',
            disciplinas: '',
            alunos: '',
            matriculaAluno: '',
            sala: '',
            turmas : 
            [
                {'id':1, 'professores':'João', 'disciplinas':'Ed. Física', 'alunos':'Cleber BamBam, Leo Stronda, Fabio Giga', 'sala':'Módulo 1'},
                {'id':2, 'professores':'Pedro', 'disciplinas':'Matemática', 'alunos':'Natural pra Cavalo, Igorfina, Marrom', 'sala':'Módulo 1'},
                {'id':3, 'professores':'Roberto', 'disciplinas':'Biologia', 'alunos':'Ramon dino, Alfi, Renatão cariani', 'sala':'Módulo 1'}
            ],
            modalAberto: false
        }
    }

    componentDidMount() {
        this.buscarTurma();
    }
    
    componentWillUnmount() {

    }

    buscarTurma = () => {
        fetch("http://localhost:5001/turma")
        .then(resposta => resposta.json())
        .then(dados => {
            this.setState( {turmas : dados})
        })
    }    

    deletarTurma = (id) => {
        fetch("http://localhost:5001/turma/"+id, {method: 'DELETE'})
        .then(resposta =>  {
          if(resposta.ok) {
            this.buscarTurma();
            }
        })
    }

    buscarDados = (id) => {
        fetch("http://localhost:5001/turma/"+id, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(turma => {
            this.setState( {
                id : turma.id,
                professores: turma.professores,
                disciplinas: turma.disciplinas,
                alunos: turma.alunos,
                sala: turma.sala
            })
            this.abrirModal();
        })
    }

    cadastrarTurma = (turma) => {
        fetch("http://localhost:5001/turma",
        {method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(turma)
        })
        .then(resposta =>  {
          if(resposta.ok) {
            this.buscarTurma();
            }
        })
    }

    atualizarTurma = (turma) => {
        fetch("http://localhost:5001/turma",
        {method: 'PUT', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(turma)
        })
        .then(resposta =>  {
          if(resposta.ok) {
            this.buscarTurma();
            }
        })
    }

    renderTabela() {
        return(
            
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Professores</th>
                        <th>Disciplinas</th>
                        <th>Alunos</th>
                        <th>Salas</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.state.turmas.map((turma) => 
                    
                        <tr>
                            <td>{turma.professores}</td>
                            <td>{turma.disciplinas}</td>
                            <td>{turma.alunos}</td>
                            <td>{turma.sala}</td>
                            <td>
                                <Button variant="danger" onClick={() => this.deletarTurma(turma.id)}>Excluir</Button></td>
                        </tr>
                    )
                }    
                </tbody>
            </Table>
        )
    }

    atualizarProfessor = (e) => {
        this.setState(
            {
                professores: e.target.value
            }
        )
    }

    atualizarDisciplinas = (e) => {
        this.setState(
            {
                disciplinas: e.target.value
            }
        )
    }

    atualizarAlunos = (e) => {
        this.setState(
            {
                alunos: e.target.value
            }
        )
    }

    atualizarSala = (e) => {
        this.setState(
            {
                sala: e.target.value
            }
        )
    }

    salvar = ()=> {
            const aluno = {
                professores: this.state.professores,
                sala: this.state.sala
            }
                this.cadastrarTurma(aluno);
        this.fecharModal();
        
    }

    adicionar = () => {
        this.setState(
            {
                professores: '',
                disciplinas: '',
                sala: ''
                
            }
        )
        this.abrirModal();
    }

    
fecharModal = () => {
    this.setState(
        {
            modalAberto: false
        }
    )
}   

abrirModal = () => {
    this.setState(
        {
            modalAberto: true
        }
    )
}

    render() {
        return (
            <div>
                
                <Modal show={this.state.modalAberto} onHide={this.fecharModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Turmas</Modal.Title>
                    </Modal.Header>
                <Modal.Body>

                    <Form>

                    <Form.Group className="mb-3">
                    <Form.Label>Digite o CPF do professor da turma:</Form.Label>
                    <Form.Control type="text" placeholder="Ex: 342.343.070-25" value={this.state.professores} onChange={this.atualizarProfessor.bind(this)}/> 
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Selecione o módulo:</Form.Label>
                    <Form.Check label="Módulo 1" type="radio" name="salas" value={"Módulo 1"} onChange={this.atualizarSala.bind(this)}/>
                    <Form.Check label="Módulo 2" type="radio" name="salas" value={"Módulo 2"} onChange={this.atualizarSala.bind(this)}/>
                    <Form.Check label="Módulo 3" type="radio" name="salas" value={"Módulo 3"} onChange={this.atualizarSala.bind(this)}/>
                    </Form.Group>
                    
                    </Form>

                </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.fecharModal}>
                    Close
                    </Button>
                    <Button variant="success" onClick={this.salvar}>Salvar</Button>
                </Modal.Footer>
                </Modal>

                <br/>

                <Button variant="outline-light" onClick={this.abrirModal}>Adicionar</Button>

                <br/>
                <br/>

                {this.renderTabela()}

            </div>
        )
    }
        
}

export default Turmas;