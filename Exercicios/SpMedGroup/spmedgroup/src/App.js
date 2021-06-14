import React, { Component } from "react";
import Footer from './components/footer/footer';
import { Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';

import { parseJwt, usuarioAutenticado } from './services/auth'

import Login from './pages/login/login';
import NotFound from './pages/notFound/notFound';
import ConsultasAdm from './pages/Consultas/Consultas adm/ListaConsultasAdm'
import ConsultasMedico from './pages/Consultas/Consultas medico/ListaConsultasMedico';
import ConsultasPaciente from './pages/Consultas/Consultas paciente/ListaConsultaPaciente';
import CadastrarConsulta from './pages/Consultas/Cadastrar consulta/CadastrarConsulta';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // usuarioAutenticado : false,
            // isAdm : false
        }
    }

    // statusAutenticacao = (UA, Adm) => {
    //     this.setState({
    //         usuarioAutenticado : UA,
    //         isAdm : Adm
    //     })
    //     console.log(this.state.usuarioAutenticado)
    // }

    


    render() {
        return (
            <Router>
                <div>
                    {/* <Header usuarioAutenticado ={this.state.usuarioAutenticado} isAdm={this.state.isAdm}/> */}
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        {/* ADM */}
                        <PermissaoAdm path="/listaconsultas" component={ConsultasAdm} />
                        <PermissaoAdm path="/cadastrarconsulta" component={CadastrarConsulta} />

                        {/* Medico */}
                        <PermissaoMedico path="/consultasmedico" component={ConsultasMedico} />

                        {/* Paciente */}
                        <PermissaoPaciente path="/consultaspaciente" component={ConsultasPaciente} />


                        <Route path="/notfound" component={NotFound} />
                        <Redirect to="/notfound" component={NotFound} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        )
    }
}

const PermissaoMedico = ({ component: Component }) => (
    <Route
        render={props =>
            usuarioAutenticado() && parseJwt().role === '2' ?
                <Component {...props} /> :
                <Redirect to='/' />
        }
    />
)

const PermissaoAdm = ({ component: Component }) => (
    <Route
        render={props =>
            usuarioAutenticado() && parseJwt().role === '1' ?
                <Component {...props} /> :
                <Redirect to='/' />
        }
    />
)



const PermissaoPaciente = ({ component: Component }) => (
    <Route
        render={props =>
            usuarioAutenticado() && parseJwt().role === '3' ?
                <Component {...props} /> :
                <Redirect to='/' />
        }
    />
)

export default App