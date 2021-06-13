using senai.SpMedGroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.SpMedGroup.webApi.Interfaces
{
    interface IConsultaRepository
    {
        List<Consulta> ListarTodas();

        Consulta BuscarPorId(int id);

        List<Consulta> BuscarPorIdPaciente(int id);

        List<Consulta> BuscarPorIdMedico(int id);

        void Cadastrar(Consulta novoConsulta);

        void AtualizarDataSituacaoConsulta(int id, Consulta consultaAtualizada);

        void AtualizarDescricaoConsulta(int id, Consulta consultaAtualizada);

        void Deletar(int id);
    }
}
