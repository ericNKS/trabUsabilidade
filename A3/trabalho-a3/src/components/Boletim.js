import React from "react"
import {Table, Button, Form, Modal} from 'react-bootstrap';


class Boletim extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            matricula: '',
            nome: '',
            turma: '',
            notaFinal: '',
            aprovacao: '',
            boletins : [],
            retorno:{},
            modalAberto: false
        }
    }

    componentDidMount() {
        this.buscarBoletim();
    }
    
    componentWillUnmount() {

    }

    buscarBoletim = () => {
        fetch("http://localhost:5001/boletim", {method: 'GET'})
        .then(resposta => resposta.json())
        .then(dados => {
            console.log(dados);
            this.setState( {boletins : dados})
        })
    }    

    buscarDados = (matricula) => {
        fetch("http://localhost:5001/boletim/"+matricula, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(boletim => {
            this.setState( {
                retorno:boletim
            })
            console.log(boletim);
        })
    }

    cadastrarBoletim = (boletim) => {
        fetch("http://localhost:5001/boletim",
        {method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(boletim)
        })
        .then(resposta =>  {
          if(resposta.ok) {
            this.buscarBoletim();
            }
        })
    }




    
    atualizarBoletim = (boletim) => {
        fetch("http://localhost:5001/boletim",
        {method: 'PUT', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(boletim)
        })
        .then(resposta =>  {
          if(resposta.ok) {
            this.buscarBoletim();
            }
        })
    }

    renderTabela() {
        return(
            
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Matrícula</th>
                        <th>Turma</th>
                        <th>Nota Final</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.state.boletins.map((boletim) => 
                    
                        <tr>
                            <td>{boletim.matricula}</td>
                            <td>{boletim.turma}</td>
                            <td>{boletim.notaFinal}</td>
                            <td>{boletim.aprovacao? 'Aprovado':'Reprovado'}</td>
                            <td>
                                <Button variant="primary" onClick={() => this.abrirModal(boletim.id,boletim.matricula)}>Atualizar</Button> 
                            </td>
                        </tr>
                    )
                }    
                </tbody>
            </Table>
        )
    }
    atualizarMatricula = (e) => {
        this.setState(
            {
                matricula: e.target.value
            }
        )
    }

    atualizarDisciplina = (e) => {
        this.setState(
            {
                turma: e.target.value
            }
        )
        this.buscarDados(this.state.id)
        console.log(this.state.id);
    }

    atualizarNotaFinal = (e) => {
        this.setState(
            {
                notaFinal: e.target.value
            }
        )
    }


    salvar() {
        if(this.state.retorno.status === 'true') {
            let aleatorio = Math.random() * (10 - 1) + 1;
            let nota = aleatorio.toFixed(2)
            const boletim = {
                matricula: this.state.matricula,
                turma: this.state.turma,
                notaFinal: nota,
                aprovacao: nota >= 6 ? true : false 
            }
                this.cadastrarBoletim(boletim);
        }
        else{
            let aleatorio = Math.random() * (10 - 1) + 1;
            let nota = aleatorio.toFixed(2)
            const boletim = {
                id: this.state.id,
                matricula: this.state.matricula,
                nome: this.state.nome,
                turma: this.state.turma,
                notaFinal: nota,
                aprovacao: nota >= 6 ? true : false 
            }
                this.atualizarBoletim(boletim);
        }

        this.fecharModal();
        
    }

    adicionar = () => {
        this.setState(
            {
                id: 0,
                nome: '',
                turma: '',
                notaFinal: ''
                
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

abrirModal = (Id, Matricula) => {
    this.setState(
        {
            modalAberto: true,
            id: Id,
            matricula: Matricula
        }
    )
}

    render() {
        return (
            <div >
                
                <Modal show={this.state.modalAberto} onHide={this.fecharModal} class="modal-container">
                    <Modal.Header closeButton>
                    <Modal.Title><h1>Boletim</h1></Modal.Title>
                    </Modal.Header>
                <Modal.Body>

                    <Form >

                    <Form.Group className="mb-3">
                    <Form.Label>Digite a matricula do aluno:</Form.Label>
                    <Form.Control type="number" placeholder="Ex: 1234" value={this.state.matricula} onChange={this.atualizarMatricula.bind(this)}/> 
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Selecione a disciplina:</Form.Label>
                    <Form.Check label="Português" type="radio" name="disciplinas" value={'Português'} onChange={this.atualizarDisciplina.bind(this)}/>
                    <Form.Check label="Inglês" type="radio" name="disciplinas" value={'Inglês'} onChange={this.atualizarDisciplina.bind(this)}/>
                    <Form.Check label="Matemática" type="radio" name="disciplinas" value={'Matemática'} onChange={this.atualizarDisciplina.bind(this)}/>
                    <Form.Check label="História" type="radio" name="disciplinas" value={'História'} onChange={this.atualizarDisciplina.bind(this)}/>
                    <Form.Check label="Geografia" type="radio" name="disciplinas" value={'Geografia'} onChange={this.atualizarDisciplina.bind(this)}/>
                    <Form.Check label="Ed. Física" type="radio" name="disciplinas" value={'Ed. Física'} onChange={this.atualizarDisciplina.bind(this)}/>
                    <Form.Check label="Biologia" type="radio" name="disciplinas" value={'Biologia'} onChange={this.atualizarDisciplina.bind(this)}/>
                    <Form.Check label="Química" type="radio" name="disciplinas" value={'Química'} onChange={this.atualizarDisciplina.bind(this)}/>
                    <Form.Check label="Física" type="radio" name="disciplinas" value={'Física'} onChange={this.atualizarDisciplina.bind(this)}/>
                    <Form.Check label="Sociologia" type="radio" name="disciplinas" value={'Sociologia'} onChange={this.atualizarDisciplina.bind(this)}/>
                    <Form.Check label="Filosofia" type="radio" name="disciplinas" value={'Filosofia'} onChange={this.atualizarDisciplina.bind(this)}/>
                    </Form.Group>

                    
                    </Form>

                </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.fecharModal}>
                    Close
                    </Button>
                    <Button variant="success" onClick={this.salvar.bind(this)}>Salvar</Button>
                </Modal.Footer>
                </Modal>

                <br/>

                <Button variant="secondary" onClick={this.abrirModal}>Adicionar</Button>

                <br/>
                <br/>

                {this.renderTabela()}

            </div>
        )
    }
        
}

export default Boletim;