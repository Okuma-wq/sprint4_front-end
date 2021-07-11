import axios from "axios";
import { Component } from "react";
import { token } from '../../../services/auth';
import Header from '../../../components/header/header';
import './ListaConsultaPaciente.css'

class ConsultasPaciente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaConsultas: [],
      hora: ''
    }
  }

  options = {
    hour: 'numeric', minute: 'numeric'
  }

  listarConsultas = () => {
    axios('https://localhost:5001/api/consulta/paciente', {
      headers: {
        'Authorization': 'Bearer ' + token()
      }
    })

      .then(resposta => this.setState({ listaConsultas: resposta.data }))

      //.then(console.log(this.state.listaConsultas))

      .catch(erro => console.log(erro))
  }

  componentDidMount() {
    this.listarConsultas()
  }

  render() {
    return (
      <div>
        <Header Tipo={2} />
        <main id='body'>
          <section>
            <div id='escurecer'>
              <div className='card-listaPaciente'>
                {/* Lista Consultas adm */}
                <h2>Lista de Consultas</h2>
                <table className='tabela'>
                  <thead>
                    <tr>
                      <th>Médico</th>
                      <th>Especialidade</th>
                      <th>Situação</th>
                      <th>Data e Horário</th>
                      <th>Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.listaConsultas.map((consulta) => {
                        return (
                          <tr key={consulta.idConsulta} className='item-tabela'>
                            <td>{consulta.idMedicoNavigation.nomeMedico}</td>
                            <td>{consulta.idMedicoNavigation.idEspecialidadeNavigation.especialidade1}</td>
                            <td>{consulta.idSituacaoNavigation.situacao}</td>
                            <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(consulta.dataConsulta)) + " as " + new Intl.DateTimeFormat('pt-BR', this.options).format(new Date(consulta.dataConsulta).getTime().toString())}</td>
                            <td>{consulta.descricao}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>

          </section>
        </main>
      </div>
    )
  }
}

export default ConsultasPaciente;