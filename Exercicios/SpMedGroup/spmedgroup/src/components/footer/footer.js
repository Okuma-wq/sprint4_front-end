import { Component } from "react";
import "./footer.css";
import Logo from "../../assets/logo_spmedgroup_v1.png"
import { NavLink } from "react-router-dom";

class Footer extends Component {

  render(){
    return(
      <footer id='footer'>
        <div className='content flex'>
          <div id='esquerda-footer'>
            <div id='links-esquerda-footer'>
              <h2>Links Úteis</h2>
              <NavLink to = '/' className='branco'>Login</NavLink>
            </div>
          </div>
          <div id='centro-footer'>
            <NavLink to = '/' id='Logo-footer'>
              <img src={Logo} alt='Logo' id='img-logo'/>
              <h3>MedicalGroup</h3>
            </NavLink>
          </div>
          <div id='direita-footer'>
            <div id='links-direita-footer'>
              <h2>Compania</h2>
              <p>Sobre</p>
              <p>Suporte</p>
              <p>Termos de Uso</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer