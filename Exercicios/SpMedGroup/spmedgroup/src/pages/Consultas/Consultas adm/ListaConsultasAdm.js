import { Component } from "react";
import EditarConsulta from "../Editar consulta/EditarConsulta";
import Header from '../../../components/header/header';
import './ListaConsultasAdm.css';

class ConsultasAdm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaConsultas: [],
      data: '',
      hora: '',
      consultaSelecionada: {},
      renderEditar: false
    }
  }

  options = {
    hour: 'numeric', minute: 'numeric'
  }

  listarConsultas = () => {
    fetch('https://localhost:5001/api/consulta', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })

      .then(lista => lista.json())

      .then(dados => this.setState({ listaConsultas: dados }))

      //.then(console.log(this.state.listaConsultas))

      .catch(erro => console.log(erro))
  }

  alterarState = async (consulta) => {
    this.setState({ consultaSelecionada: consulta })
    await this.setState({ renderEditar: !this.state.renderEditar })
    if (this.state.renderEditar === false) {
      setTimeout(() => {
        this.listarConsultas();

      }, 100);
      console.log('atualizou')
    }
    //console.log(this.state.idSelecionado)
  }

  componentDidMount() {
    this.listarConsultas();
  }

  render() {
    return (
      <div>
        <Header Tipo={3} />
        {this.state.renderEditar && <EditarConsulta perfil="adm" consultaSelecionada={this.state.consultaSelecionada} alterarEstado={this.alterarState} />}
        <main id='body'>
          <section id='section'>
            <div id='escurecer'>
              <div className='card-listaAdm'>
                {/* Lista Consultas adm */}
                <h2>Lista de Consultas</h2>
                <table className='tabela'>
                  <thead>
                    <tr >
                      <th>Paciente</th>
                      <th>Médico</th>
                      <th>Especialidade</th>
                      <th>Data e Horário</th>
                      <th>Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.listaConsultas.map((consulta) => {
                        return (
                          <tr key={consulta.idConsulta} onClick={() => this.alterarState(consulta)} className='item-tabela'>
                            <td>{consulta.idPacienteNavigation.nomePaciente}</td>
                            <td>{consulta.idMedicoNavigation.nomeMedico}</td>
                            <td>{consulta.idMedicoNavigation.idEspecialidadeNavigation.especialidade1}</td>
                            <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(consulta.dataConsulta))  + " as " + new Intl.DateTimeFormat('pt-BR', this.options).format(new Date(consulta.dataConsulta).getTime().toString())}</td>
                            <td>{consulta.idSituacaoNavigation.situacao}</td>
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

export default ConsultasAdm;