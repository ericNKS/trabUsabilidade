import React from "react"
import {Table, Button, Form, Modal} from 'react-bootstrap';


class Boletim extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            nome: '',
            turma: '',
            notaFinal: '',
            boletins : [{'id':1, 'nome':'Pedro', 'turma':'Módulo 1', 'notaFinal':'6'}],
            modalAberto: false
        }
    }

    componentDidMount() {
        this.buscarBoletim();
    }
    
    componentWillUnmount() {

    }

    buscarBoletim = () => {
        fetch("https://localhost:5001/alunos")
        .then(resposta => resposta.json())
        .then(dados => {
            this.setState( {boletins : dados})
        })
    }    

    deletarBoletim = (id) => {
        fetch("https://localhost:5001/alunos"+id, {method: 'DELETE'})
        .then(resposta =>  {
          if(resposta.ok) {
            this.buscarBoletim();
            }
        })
    }

    buscarDados = (id) => {
        fetch("https://localhost:5001/alunos"+id, {method: 'GET'})
        .then(resposta => resposta.json())
        .then(boletim => {
            this.setState( {
                id : boletim.id,
                nome: boletim.nome,
                turma: boletim.turma,
                notaFinal: boletim.notaFinal
            })
            this.abrirModal();
        })
    }

    cadastrarBoletim = (boletim) => {
        fetch("https://localhost:5001/alunos",
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
        fetch("https://localhost:5001/alunos",
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
                        <th>Nome</th>
                        <th>Turma</th>
                        <th>Nota Final</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.state.boletins.map((boletim) => 
                    
                        <tr>
                            <td>{boletim.nome}</td>
                            <td>{boletim.turma}</td>
                            <td>{boletim.notaFinal}</td>
                            <td>
                                <Button variant="primary" onClick={() => this.buscarDados(boletim.id)}>Atualizar</Button> 
                                <Button variant="danger" onClick={() => this.deletarAluno(boletim.id)}>Excluir</Button></td>
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

   atualizarTurma = (e) => {
        this.setState(
            {
                turma: e.target.value
            }
        )
    }

    atualizarNotaFinal = (e) => {
        this.setState(
            {
                notaFinal: e.target.value
            }
        )
    }


    salvar() {

        if(this.state.id == 0) {
            const boletim = {
                nome: this.state.nome,
                turma: this.state.turma,
                notaFinal: this.state.notaFinal
            }
                this.cadastrarBoletim(boletim);
        }
        else{
            const boletim = {
                id: this.state.id,
                nome: this.state.nome,
                turma: this.state.turma,
                notaFinal: this.state.notaFinal
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
                    <Modal.Title><h1>Boletim</h1></Modal.Title>
                    </Modal.Header>
                <Modal.Body>

                    <Form >

                    <Form.Group className="mb-3">
                    <Form.Label>ID:</Form.Label>
                    <Form.Control type="text" value={this.state.id} readOnly={true}/> 
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Digite o nome do Professor:</Form.Label>
                    <Form.Control type="text" placeholder="Ex: João da Silva" value={this.state.nome} onChange={this.atualizarNome}/> 
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Digite o turma do Professor:</Form.Label>
                    <Form.Control type="number" placeholder="Ex: 000.000.000.00" value={this.state.turma} onChange={this.alturarTurma}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Selecione o Título Acadêmico do Professor:</Form.Label>
                    <Form.Check label="Graduação (Licenciatura)" type="radio" name="titulos" value={this.state.notaFinal} onChange={this.atualizarNotaFinal}/>
                    <Form.Check label="Pós-Graduação" type="radio" name="titulos" value={this.state.notaFinal} onChange={this.atualizarNotaFinal}/>
                    <Form.Check label="Mestrado" type="radio" name="titulos" value={this.state.notaFinal} onChange={this.atualizarNotaFinal}/>
                    <Form.Check label="Doutorado" type="radio" name="titulos" value={this.state.notaFinal} onChange={this.atualizarNotaFinal}/>
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

                <Button variant="secondary" onClick={this.abrirModal}>Adicionar</Button>

                <br/>
                <br/>

                {this.renderTabela()}

            </div>
        )
    }
        
}

export default Boletim;