import Home from './components/Home' ;
import Alunos from './components/Alunos';
import Boletim from './components/Boletim';
import Professores from './components/Professores';
import Turmas from './components/Turmas';
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  return (
    <div className="App" >

      <h1 className='text-light text-uppercase mb-4'><center>Centro Educacional Eagles</center></h1>
      
      <BrowserRouter>
    
    <Nav variant="tabs" className=''>
     
        <Nav.Link as={Link} className='nav-link' to="/">Página Inicial</Nav.Link>
        <Nav.Link as={Link} className='nav-link' to="/professores">Cadastro de Professores</Nav.Link>
        <Nav.Link as={Link} className='nav-link' to="/alunos">Cadastro de Alunos</Nav.Link>
        <Nav.Link as={Link} className='nav-link' to="/Turmas">Cadastro de Turmas</Nav.Link>
        <Nav.Link as={Link} className='nav-link' to="/boletim">Boletim</Nav.Link>
    
    </Nav>

      <Routes>
          <Route path="/" index element={<Home/>}></Route>
          <Route path="/professores" index element={<Professores/>}></Route>
          <Route path="/alunos" index element={<Alunos/>}></Route>
          <Route path="/Turmas" index element={<Turmas/>}></Route>
          <Route path="/boletim" index element={<Boletim/>}></Route>
      </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
