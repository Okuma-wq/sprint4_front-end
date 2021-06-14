import './login.css';
import React, { Component } from 'react';
import axios from 'axios';
import { parseJwt } from '../../services/auth';
import Header from '../../components/header/header';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UA : props.usuarioAutenticado,
      erroMessagem: '',
      email: '',
      senha: '',
      isLoding: false
    }
  }


  efetuarLogin = (event) => {
    event.preventDefault();

    this.setState({ erroMessagem: '', isLoding: true })

    axios.post('https://localhost:5001/api/login', {
      email: this.state.email,
      senha: this.state.senha
    })

      .then(resposta => {
        if (resposta.status === 200) {
          localStorage.setItem('token', resposta.data.token)

          this.setState({ isLoding: false })

          // this.props.statusAutenticacao(true, (parseJwt().role === '1'))
          //console.log(this.props)

          if (parseJwt().role === '1') {
            this.props.history.push('/listaconsultas')
          }
          else if (parseJwt().role === '2') {
            this.props.history.push('/consultasmedico')
          }
          else if (parseJwt().role === '3') {
            this.props.history.push('/consultaspaciente')
          }
        }
      })

      .catch(() => {
        this.setState({ erroMessagem: 'E-mail ou senha inválidos' })

        this.setState({ isLoding: false })
      })
  }

  atualizarEstado = async (event) => {
    await this.setState({ [event.target.name]: event.target.value })
    //console.log(event.target.value)
  }

  render() {
    return (
      <div>
        <Header Tipo = {1} />
        <main id='body'>
          <div id='escurecer' />
          <div id='card'>
            <form>
              <div>
                <h3>Email</h3>
                <input
                  className='input'
                  type='email'
                  name='email'
                  value={this.state.email}
                  onChange={this.atualizarEstado}
                  />
              </div>
              <div>
                <h3>Senha</h3>
                <input
                  className='input'
                  type='text'
                  name='senha'
                  value={this.state.senha}
                  onChange={this.atualizarEstado}
                />  
              </div>
              <p>{this.state.erroMessagem}</p>

              {
                this.state.isLoding === false ? <button type='submit' onClick={this.efetuarLogin} disabled={this.state.email === '' || this.state.senha === '' ? 'none' : ''}>Logar</button> : <button type='submit' onClick={this.efetuarLogin} disabled>Logar</button>
              }
            </form>
          </div>
        </main>
      </div>
    )
  }
}

export default Login;
