import { Component } from "react";
import EditarConsulta from "../Editar consulta/EditarConsulta";
import axios from "axios";

class ConsultasMedico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaConsultas: [],
      consultaSelecionada: {},
      renderEditar: false
    }
  }

  listarConsultas = () => {
    axios('https://localhost:5001/api/consulta/medico', {
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    })

      .then(resposta => this.setState({listaConsultas : resposta.data}))

      .then(resposta => console.log(resposta.data))

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
        {this.state.renderEditar && <EditarConsulta perfil="medico" consultaSelecionada={this.state.consultaSelecionada} alterarEstado={this.alterarState} />}
        <main>
          <section>
            {/* Lista Consultas adm */}
            <h2>Lista de Consultas</h2>
            <table>
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Descricao</th>
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
                        <td>{consulta.descricao}</td>
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

export default ConsultasMedico;