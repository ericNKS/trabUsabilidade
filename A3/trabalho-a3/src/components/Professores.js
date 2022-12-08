import React from "react"
import {Table, Button, Form, Modal} from 'react-bootstrap';


class Professores extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            cpf: '',
            tituloAcad: 'Graduação Licenciatura',
            disciplina: 'Português',
            professores : [],
            modalAberto: false,
            retorno: {}
        }
    }

    componentDidMount() {
        this.buscarProfessor();
    }
    

    buscarProfessor = () => {
        fetch("http://localhost:5001/professor")
        .then(resposta => resposta.json())
        .then(dados => {
            this.setState( {professores : dados})
        })
    }    

    deletarProfessor = (id) => {
        fetch("http://localhost:5001/professor/"+id, {method: 'DELETE'})
        .then(resposta =>  {
          if(resposta.ok) {
            this.buscarProfessor();
            }
        })
    }

    buscarDados = (id) => {
        fetch("http://localhost:5001/professor"+id, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(professor => {
            this.setState( {
                id : professor.id,
                nome: professor.nome,
                cpf: professor.cpf,
                tituloAcad: professor.tituloAcad,
                disciplina: professor.disciplina
            })
            this.abrirModal();
        })
    }

    cadastrarProfessor = (professor) => {
        fetch("http://localhost:5001/professor",
        {method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(professor)
        })
        .then(resposta =>  {
          if(resposta.ok) {
            this.buscarProfessor();
            }
        })
    }


    buscarAlunoEs = (id) => {
        fetch("http://localhost:5001/professor/"+id, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(dados => {
            this.setState({
                retorno: dados
            })
        })
    }


    atualizarProfessor = (professor) => {
        fetch("http://localhost:5001/professor",
        {method: 'PUT', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(professor)
        })
        .then(resposta =>  {
          if(resposta.ok) {
            this.buscarProfessor();
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
                        <th>Título Acadêmico</th>
                        <th>Disciplina</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.state.professores.map((professor) => 
                    
                        <tr>
                            <td>{professor.nome}</td>
                            <td>{professor.cpf}</td>
                            <td>{professor.tituloAcad}</td>
                            <td>{professor.disciplina}</td>
                            <td>
                                <Button variant="primary" onClick={() => this.abrirModal()}>Atualizar</Button> 
                                <Button variant="danger" onClick={() => this.deletarProfessor(professor.cpf)}>Excluir</Button></td>
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
        this.buscarAlunoEs(e.target.value)
    }

    atualizarTituloAcad = (e) => {
        this.setState(
            {
                tituloAcad: e.target.value
            }
        )
    }

    atualizarDisciplina = (e) => {
        this.setState(
            {
                disciplina: e.target.value
            }
        )
    }

    salvar() {
        if(this.state.retorno.status === 'true')
        {
            const professor = {
                nome: this.state.nome,
                cpf: this.state.cpf,
                tituloAcad: this.state.tituloAcad,
                disciplina: this.state.disciplina
            }
            
                this.cadastrarProfessor(professor);
        }else{
            const professor = {
                nome: this.state.nome,
                cpf: this.state.cpf,
                tituloAcad: this.state.tituloAcad,
                disciplina: this.state.disciplina
            }
                this.atualizarProfessor(professor);
                
            
        }
        this.fecharModal();
        
    }

    adicionar = () => {
        this.setState(
            {
                nome: '',
                cpf: '',
                tituloAcad: '',
                disciplina: ''
                
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
            <div >
                
                <Modal show={this.state.modalAberto} onHide={this.fecharModal} class="modal-container">
                    <Modal.Header closeButton>
                    <Modal.Title>Adicionar Professor</Modal.Title>
                    </Modal.Header>
                <Modal.Body>

                    <Form >

                    <Form.Group className="mb-3">
                    <Form.Label>Digite o nome do Professor:</Form.Label>
                    <Form.Control type="text" placeholder="Ex: João da Silva" value={this.state.nome} onChange={this.atualizarNome.bind(this)}/> 
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Digite o CPF do Professor:</Form.Label>
                    <Form.Control type="text" placeholder="Ex: 000.000.000.00" value={this.state.cpf} onChange={this.atualizarCPF.bind(this)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Selecione o Título Acadêmico do Professor:</Form.Label>
                    <select class="form-control" id="titulos" onChange={this.atualizarTituloAcad.bind(this)}>
                        <option>Graduação Licenciatura</option>
                        <option>Pós-Graduação</option>
                        <option>Mestrado</option>
                        <option>Doutorado</option>
                    </select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Selecione a disciplina:</Form.Label>
                    <select class="form-control" id="disciplinas" onChange={this.atualizarDisciplina.bind(this)}>
                        <option>Português</option>
                        <option>Matemática</option>
                        <option>Ed Física</option>
                        <option>Sociologia</option>
                        <option>Filosofia</option>
                        <option>Química</option>
                        <option>Biologia</option>
                        <option>Física</option>
                        <option>Inglês</option>
                        <option>História</option>
                        <option>Geografia</option>
                    </select>
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

                <Button variant="outline-light" onClick={this.abrirModal}>Adicionar</Button>

                <br/>
                <br/>

                {this.renderTabela()}

            </div>
        )
    }
        
}

export default Professores;