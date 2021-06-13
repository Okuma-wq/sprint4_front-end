import { Component } from "react";
import { token } from '../../../services/auth';
import axios from "axios";

import './style.css';


class EditarConsulta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perfil: props.perfil,
      alterarState: props.alterarEstado,
      listaSituacoes: [],
      idConsulta: props.consultaSelecionada.idConsulta,
      paciente: props.consultaSelecionada.idPacienteNavigation.nomePaciente,
      dataNascimento: props.consultaSelecionada.idPacienteNavigation.dataNascimento,
      dataConsulta: props.consultaSelecionada.dataConsulta,
      idSituacao: props.consultaSelecionada.idSituacaoNavigation.idSituacao,
      situacao: props.consultaSelecionada.idSituacaoNavigation.situacao,
      descricao: props.consultaSelecionada.descricao,
      data: '',
      hora: ''
    }
  }

  listarSituacoes = () => {
    axios('https://localhost:5001/api/situacaoconsulta')

    .then(resposta => this.setState({listaSituacoes : resposta.data}))

      .catch(erro => console.log(erro))
  }

  splitDataConsulta = () => {
    this.setState({ data: this.state.dataConsulta.split('T')[0] })
    this.setState({ hora: this.state.dataConsulta.split('T')[1] })
  }

  editarConsultaSituacaoData = (event) => {
    //ignora o comportamento do navegador (n atualiza toda vez q aperta o botão de cadastrar)
    event.preventDefault();

    axios.put(`https://localhost:5001/api/consulta/adm/${this.state.idConsulta}`, {
        idSituacao: this.state.idSituacao,
        DataConsulta: `${this.state.data}T${this.state.hora}`
      },

      {headers: {
        'Authorization' : 'Bearer ' + token()
      }}
    )


      //.then(console.log(this.state.idSituacao, this.state.dataConsulta))

      .catch(erro => console.log(erro))

      .then(this.state.alterarState())
  }

  editarConsultaDescricao = (event) => {
    //ignora o comportamento do navegador (n atualiza toda vez q aperta o botão de cadastrar)
    event.preventDefault();

    axios.put(`https://localhost:5001/api/consulta/medico/${this.state.idConsulta}`, {
        idSituacao: this.state.idSituacao,
        DataConsulta: `${this.state.data}T${this.state.hora}`,
        Descricao : this.state.descricao
      },

      {headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + token()
      }
    })


      //.then(console.log(this.state.idSituacao, this.state.dataConsulta))

      .catch(erro => console.log(erro))

      .then(this.state.alterarState())
  }

  atualizarEstado = async (event) => {
    await this.setState({ [event.target.name]: event.target.value })
    //console.log(this.state.hora, this.state.data)
    //console.log(event.target.value)
  }

  componentDidMount() {
    this.listarSituacoes();
    this.splitDataConsulta();
  }

  render() {
    //console.log(this.state.idSituacao)
    //var options = {}
    if (this.state.perfil === "adm") {
      return (
        <div>
          <form onSubmit={this.editarConsultaSituacaoData}>
            <div>
              <div>
                <div>
                  <h3>Nome do Paciente</h3>
                  <p>{this.state.paciente}</p>
                </div>
                <div>
                  <h3>Data de Nascimento</h3>
                  <p>{new Intl.DateTimeFormat('default').format(new Date(this.state.dataNascimento))}</p>
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="data">Data da Consulta</label>
                  <input
                    type='date'
                    name='data'
                    value={this.state.data}
                    onChange={this.atualizarEstado}
                  />
                </div>
                <div>
                  <label htmlFor="hora" >Horário da Consulta</label>
                  <input
                    type='time'
                    name='hora'
                    value={this.state.hora}
                    onChange={this.atualizarEstado}
                  />
                </div>
                <div>
                  <label htmlFor="idSituação">Situação</label>
                  <select name="idSituacao" id="idSituacao" onChange={this.atualizarEstado} >
                    {
                      this.state.listaSituacoes.map((situacao) => {
                        if (this.state.idSituacao === situacao.idSituacao) {
                          return (
                            <option key={situacao.idSituacao} value={situacao.idSituacao} selected='selected'>{situacao.situacao}</option>
                          )
                        }
                        return (
                          <option key={situacao.idSituacao} value={situacao.idSituacao} >{situacao.situacao}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
              <div>
                <h3>Descrição</h3>
                <p>{this.state.descricao}</p>
              </div>
              <div>
                <button type="submit">Salvar Alterações</button>
              </div>
            </div>
          </form>
        </div>
      )
    }
    if (this.state.perfil === "medico") {
      return (
        <div>
          <form onSubmit={this.editarConsultaDescricao}>
            <div>
              <div>
                <div>
                  <h3>Nome do Paciente</h3>
                  <p>{this.state.paciente}</p>
                </div>
                <div>
                  <h3>Data de Nascimento</h3>
                  <p>{new Intl.DateTimeFormat('pt-BR').format(new Date(this.state.dataNascimento))}</p>
                </div>
              </div>
              <div>
                <div>
                  <h3>Data da Consulta</h3>
                  <p>{new Intl.DateTimeFormat('pt-BR').format(new Date(this.state.dataConsulta))}</p>
                </div>
                <div>
                  <h3>Horário da Consulta</h3>
                  <p>{this.state.hora}</p>
                </div>
                <div>
                  <p>{this.state.situacao}</p>
                </div>
              </div>
              <div>
                <textarea
                  rows='5'
                  cols='50'
                  type='text'
                  name='descricao'
                  value={this.state.descricao}
                  onChange={this.atualizarEstado}
                />
              </div>
              <div>
                <button type="submit">Salvar Alterações</button>
              </div>
            </div>
          </form>
        </div>
      )
    }
  }
}

export default EditarConsulta