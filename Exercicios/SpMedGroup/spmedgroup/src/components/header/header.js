import { Component } from "react";
import "./header.css";
import Logo from "../../assets/logo_spmedgroup_v1.png"
import User from '../../assets/0c3b3adb1a7530892e55ef36d3be6cb8.png'
import { NavLink } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Tipo: props.Tipo
        }
    }

    Logout = () => {
        localStorage.removeItem('token')
    }

    render() {
        if (this.state.Tipo === 1) {
            return (
                <header id='header'>
                    <div className='content flex-bt-center'>
                        <div >
                            <NavLink to='/' id='logo-header'>
                                <img src={Logo} alt='Logo SpMedicalGroup' id='logo-img-header' />
                                <h3>MedicalGroup</h3>
                            </NavLink>
                        </div>
                        <div id='login'>
                            <NavLink to='/' id='btn-sair'>Login</NavLink>
                        </div>
                    </div>
                </header>
            )
        }
        else if (this.state.Tipo === 2) {
            return (
                <header id='header'>
                    <div className='content flex-bt-center'>
                        <div >
                            <NavLink to='/' id='logo-header'>
                                <img src={Logo} alt='Logo SpMedicalGroup' id='logo-img-header' />
                                <h3>MedicalGroup</h3>
                            </NavLink>
                        </div>
                        <div>
                            <img src={User} alt='Imagem de usuario' id='user-img' />
                            <NavLink to='/' onClick={this.Logout} id='btn-sair'>Sair</NavLink>
                        </div>
                    </div>
                </header>
            )
        }
        else if(this.state.Tipo === 3){
            return(
                    <header id = 'header' >
                    <div className='content flex-bt-center'>
                        <div >
                            <NavLink to='/' id='logo-header'>
                                <img src={Logo} alt='Logo SpMedicalGroup' id='logo-img-header' />
                                <h3>MedicalGroup</h3>
                            </NavLink>
                        </div>
                        <div id='menu'>
                            <div id='btn-adm'>
                                <NavLink to='/cadastrarconsulta' className='menu-btn'>Cadastrar Consulta</NavLink>
                                <NavLink to='/listaconsultas' className='menu-btn'>Listar Consultas</NavLink>
                            </div>
                            <div id='user-sair'>
                                <img src={User} alt='Imagem de usuario' id='user-img' />
                                <NavLink to='/' onClick={this.Logout} id='btn-sair'>Sair</NavLink>
                            </div>
                        </div>
                    </div>
                    </header>
                )
            }   
        }
    }


export default Header