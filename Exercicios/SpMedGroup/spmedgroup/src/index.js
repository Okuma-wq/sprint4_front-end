import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';

import './index.css';

import { parseJwt, usuarioAutenticado } from './services/auth'

import Login from './pages/login/login';
import NotFound from './pages/notFound/notFound';
import ConsultasAdm from './pages/Consultas/Consultas adm/ListaConsultasAdm'
import ConsultasMedico from './pages/Consultas/Consultas medico/ListaConsultasMedico';
import ConsultasPaciente from './pages/Consultas/Consultas paciente/ListaConsultaPaciente';
import CadastrarConsulta from './pages/Consultas/Cadastrar consulta/CadastrarConsulta';

import reportWebVitals from './reportWebVitals';

const PermissaoAdm = ({ component : Component}) => (
  <Route
    render = {props =>
      usuarioAutenticado() && parseJwt().role === '1'?
      <Component {...props}/> :
      <Redirect to = '/'/>
    }
  />
)

const PermissaoMedico = ({ component : Component}) => (
  <Route
    render = {props =>
      usuarioAutenticado() && parseJwt().role === '2'?
      <Component {...props}/> :
      <Redirect to = '/'/>
    }
  />
)

const PermissaoPaciente = ({ component : Component}) => (
  <Route
    render = {props =>
      usuarioAutenticado() && parseJwt().role === '3'?
      <Component {...props}/> :
      <Redirect to = '/'/>
    }
  />
)

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login}/>
        {/* ADM */}
        <PermissaoAdm path="/listaconsultas" component={ConsultasAdm}/>
        <PermissaoAdm path="/cadastrarconsulta" component={CadastrarConsulta}/>

        {/* Medico */}
        <PermissaoMedico path="/consultasmedico" component={ConsultasMedico}/>

        {/* Paciente */}
        <PermissaoPaciente path="/consultaspaciente" component={ConsultasPaciente}/>

        
        <Route path="/notfound" component={NotFound}/>
        <Redirect to="/notfound" component={NotFound}/>
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
