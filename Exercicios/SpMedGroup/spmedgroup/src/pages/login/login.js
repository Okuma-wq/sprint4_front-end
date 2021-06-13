import './login.css';
import React, { Component } from 'react';
import axios from 'axios';
import { parseJwt } from '../../services/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <main>
          <form>
            <input
              type='email'
              name='email'
              value={this.state.email}
              onChange={this.atualizarEstado}
              placeholder='Email'
            />
            <input
              type='password'
              name='senha'
              value={this.state.senha}
              onChange={this.atualizarEstado}
              placeholder='Senha'
            />
            <p>{this.state.erroMessagem}</p>

            {
              this.state.isLoding === false ? <button type='submit' onClick={this.efetuarLogin} disabled={this.state.email === '' || this.state.senha === '' ? 'none' : ''}>Logar</button> : <button type='submit' onClick={this.efetuarLogin} disabled>Logar</button>
            }
            {

            }

          </form>
        </main>
      </div>
    )
  }
}

export default Login;
