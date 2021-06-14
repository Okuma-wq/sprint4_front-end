import axios from "axios";
import { Component } from "react";
import { token } from '../../../services/auth';
import Header from '../../../components/header/header';

class ConsultasPaciente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaConsultas: []
    }
  }

  listarConsultas = () => {
    axios('https://localhost:5001/api/consulta/paciente', {
      headers: {
        'Authorization' : 'Bearer ' + token()
      }
    })

      .then(resposta => this.setState({listaConsultas : resposta.data}))

      //.then(console.log(this.state.listaConsultas))

      .catch(erro => console.log(erro))
  }

  componentDidMount() {
    this.listarConsultas()
  }

  render() {
    return (
      <div>
        <Header Tipo={2}/>
        <main>
          <section>
            {/* Lista Consultas adm */}
            <h2>Lista de Consultas</h2>
            {
              this.state.listaConsultas.map((consulta) => {
                return (
                  <tr key={consulta.idConsulta}>
                    <td>{consulta.idMedicoNavigation.nomeMedico}</td>
                    <td>{consulta.idMedicoNavigation.idEspecialidadeNavigation.especialidade1}</td>
                    <td>{consulta.idSituacaoNavigation.situacao}</td>
                    <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(consulta.dataConsulta)) + " as " + new Date(consulta.dataConsulta).getTime().toString()}</td>
                    <td>{consulta.descricao}</td>
                  </tr>
                )
              })
            }
          </section>
        </main>
      </div>
    )
  }
}

export default ConsultasPaciente;