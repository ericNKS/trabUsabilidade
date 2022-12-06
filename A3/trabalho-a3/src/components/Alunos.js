import React from "react"
import {Table, Button, Form, Modal} from 'react-bootstrap';



class Alunos extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            cpf: '',
            matricula: '',
            sala: '',
            alunos : [],
            modalAberto: false,
            retorno: {}
        }

    }

    componentDidMount() {
        this.buscarAluno();
    }

    buscarAluno = () => {
        fetch("http://localhost:5001/alunos")
        .then(resposta => resposta.json())
        .then(dados => {
            this.setState( {alunos : dados})
        })
    }    

    deletarAluno = (matricula) => {
        fetch("http://localhost:5001/alunos/"+matricula, {method: 'DELETE'})
        .then(resposta =>  {
          if(resposta.ok) {
            this.buscarAluno();
            }
        })
    }

    buscarDados = (id) => {
        fetch("http://localhost:5001/alunos/"+id, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(aluno => {
            this.setState( {
                nome: aluno.nome,
                cpf: aluno.cpf,
                matricula: aluno.matricula,
                sala: aluno.sala
            })
            this.abrirModal();
        })
    }
    cadastrarAluno = (aluno) => {
        fetch("http://localhost:5001/alunos",
        {method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(aluno)
    })
    .then(resposta =>  {
        if(resposta.ok) {
            this.buscarAluno();
        }
    })
}



    buscarAlunoEs = (id) => {
        fetch("http://localhost:5001/alunos/"+id, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(dados => {
            this.setState({
                retorno: dados
            })
        })
    }

    atualizarAluno = (aluno) => {
    fetch("http://localhost:5001/alunos",
    {method: 'PUT',  
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(aluno)
        })
        .then(resposta =>  {
            if(resposta.ok) {
                this.buscarAluno();
              }
          })
        
    }


    renderTabela() {
        return(
            
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Matrícula</th>
                        <th>Sala</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.state.alunos.map((aluno) => 
                    
                        <tr>
                            <td>{aluno.nome}</td>
                            <td>{aluno.cpf}</td>
                            <td>{aluno.matricula}</td>
                            <td>{aluno.sala}</td>
                            <td>
                                <Button variant="primary" onClick={() => this.abrirModal()}>Atualizar</Button> 
                                <Button variant="danger" onClick={() => this.deletarAluno(aluno.matricula)}>Excluir</Button></td>
                        </tr>
                    )
                }    
                </tbody>
            </Table>
        )
    }

    atualizarNome = (e) => {
        this.setState(
            {
                nome: e.target.value
            }
        )
    }

    atualizarCPF = (e) => {
        this.setState(
            {
                cpf: e.target.value
            }
        )
    }

    atualizarMatricula = (e) => {
        this.setState(
            {
                matricula: e.target.value
            }
        )
        this.buscarAlunoEs(e.target.value)
    }

    atualizarSala = (e) => {
        this.setState(
            {
                sala: e.target.value
            }
        )
        console.log(e.target.value);
    }

    salvar() {
            
            if(this.state.retorno.status === 'true')
            {
                const alunoCriar = {
                    nome: this.state.nome,
                    cpf: this.state.cpf,
                    matricula: this.state.matricula,
                    sala: this.state.sala
                }
                    this.cadastrarAluno(alunoCriar);
            }else{
                const alunoAtualizar = {
                    nome: this.state.nome,
                    cpf: this.state.cpf,
                    matricula: this.state.matricula,
                    sala: this.state.sala
                }
                    this.atualizarAluno(alunoAtualizar);
                    
                
            }
        this.fecharModal();


    }

    adicionar = () => {
        this.setState(
            {
                nome: '',
                cpf: '',
                matricula: '',
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
                    <Modal.Title>Adicionar Aluno</Modal.Title>
                    </Modal.Header>
                <Modal.Body>

                    <Form>


                    <Form.Group className="mb-3">
                    <Form.Label>Digite o nome do Aluno:</Form.Label>
                    <Form.Control type="text" placeholder="Ex: João da Silva" value={this.state.nome} onChange={this.atualizarNome.bind(this)}/> 
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Digite o CPF do Aluno:</Form.Label>
                    <Form.Control type="number" placeholder="Ex: 000.000.000.00" value={this.state.cpf} onChange={this.atualizarCPF.bind(this)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Digite a matrícula do Aluno:</Form.Label>
                    <Form.Control type="number" placeholder="Ex: 1234" value={this.state.matricula} onChange={this.atualizarMatricula.bind(this)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Selecione o módulo:</Form.Label>
                    <Form.Check label="Módulo 1" type="radio" name="salas" value={1} onChange={this.atualizarSala.bind(this)}/>
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

export default Alunos;