import { Component } from "react";
import EditarConsulta from "../Editar consulta/EditarConsulta";

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

  listarConsultas = () => {
    fetch('https://localhost:5001/api/consulta')

      .then(lista => lista.json())

      .then(dados => this.setState({ listaConsultas: dados }))

      .then(console.log(this.state.listaConsultas))

      .catch(erro => console.log(erro))
  }

  alterarState = async (consulta) => {
    this.setState({ consultaSelecionada: consulta })
    await this.setState({ renderEditar: !this.state.renderEditar })
    if (this.state.renderEditar === false) {
      setTimeout(() => {
        this.listarConsultas();

      }, 50);
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
        {this.state.renderEditar && <EditarConsulta perfil="adm" consultaSelecionada={this.state.consultaSelecionada} alterarEstado={this.alterarState} />}
        <main>
          <section>
            {/* Lista Consultas adm */}
            <h2>Lista de Consultas</h2>
            <table>
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Médico</th>
                  <th>Especialidade</th>
                  <th>Data</th>
                  <th>Situação</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.listaConsultas.map((consulta) => {
                    return (
                      <tr key={consulta.idConsulta} onClick={() => this.alterarState(consulta)}>
                        <td>{consulta.idPacienteNavigation.nomePaciente}</td>
                        <td>{consulta.idMedicoNavigation.nomeMedico}</td>
                        <td>{consulta.idMedicoNavigation.idEspecialidadeNavigation.especialidade1}</td>
                        <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(consulta.dataConsulta))}</td>
                        <td>{consulta.idSituacaoNavigation.situacao}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </section>
        </main>
      </div>
    )
  }
}

export default ConsultasAdm;