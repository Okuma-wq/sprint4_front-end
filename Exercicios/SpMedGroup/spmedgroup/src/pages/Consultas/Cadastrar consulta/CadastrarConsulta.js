import { Component } from "react";
import Header from '../../../components/header/header';

class CadastrarConsulta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaPacientes: [],
      listaMedicos: [],
      idPaciente: 0,
      idMedico: 0,
      data: "",
      hora: "",
      dataConsulta: "",
      idSituacao: 1
    }
  }

  listarPacientes = () => {
    fetch('https://localhost:5001/api/paciente', {
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    })

      .then(lista => lista.json())

      .then(dados => this.setState({ listaPacientes: dados }))

      .catch(erro => console.log(erro))
  }

  listarMedicos = () => {
    fetch('https://localhost:5001/api/medico',{
    headers: {
      'Authorization' : 'Bearer ' + localStorage.getItem('token')
    }})

      .then(resposta => resposta.json())

      .then(dados => this.setState({ listaMedicos: dados }))

      .catch(erro => console.log(erro))
  }


  // lembrar de perguntar sobre isso
  atualizarEstado = async (event) => {
    await this.setState({ [event.target.name]: event.target.value })
    //console.log(event.target.value)
  }

  //testar isso depois de arrumar cadastro
  cadastrarconsulta = (event) => {
    //ignora o comportamento do navegador (n atualiza toda vez q aperta o botão de cadastrar)
    event.preventDefault();

    fetch('https://localhost:5001/api/consulta', {
      method: 'POST',

      body: JSON.stringify({
        idPaciente: this.state.idPaciente,
        idMedico: this.state.idMedico,
        idSituacao: this.state.idSituacao,
        dataConsulta: `${this.state.data}T${this.state.hora}`
      }),

      headers: {
        'Content-Type': 'application/json'
      }
    })

      .then(console.log('Tentativa de cadastro'))

      .catch(erro => console.log(erro))
  }

  componentDidMount() {
    this.listarPacientes();
    this.listarMedicos();
  }

  //lembrar de perguntar sobre essa parte inteira
  render() {
    return (
      <div>
        <Header Tipo={3}/>
        <main>
          <section>
            <h2>Cadastro de Consultas</h2>

            {/* Formulario de cadastro de consulta */}
            <form onSubmit={this.cadastrarconsulta}>
              <div>
                <select name="idPaciente" id="idPaciente"
                  onChange={this.atualizarEstado}>
                  <option value="0">Selecione uma opção abaixo...</option>
                  {
                    this.state.listaPacientes.map((paciente) => {
                      return (
                        <option key={paciente.idPaciente} value={paciente.idPaciente}>{paciente.nomePaciente}</option>
                      )
                    })
                  }
                </select>
                <select name="idMedico" id="idMedico"
                  onChange={this.atualizarEstado}>
                  <option value="0">Selecione uma opção abaixo...</option>
                  {
                    this.state.listaMedicos.map((medico) => {
                      return (
                        <option key={medico.idMedico} value={medico.idMedico}>{medico.nomeMedico}</option>
                      )
                    })
                  }
                </select>
                <input
                  type="date"
                  name="data"
                  value={this.state.data}
                  onChange={this.atualizarEstado}
                />
                <input
                  type="time"
                  name="hora"
                  value={this.state.time}
                  onChange={this.atualizarEstado}
                  on
                />
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          </section>
        </main>
      </div>
    )
  }
}

export default CadastrarConsulta
