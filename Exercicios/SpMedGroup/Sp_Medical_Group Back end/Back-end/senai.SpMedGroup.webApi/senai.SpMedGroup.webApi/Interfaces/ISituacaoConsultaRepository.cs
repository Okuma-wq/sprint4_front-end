using senai.SpMedGroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.SpMedGroup.webApi.Interfaces
{
    interface ISituacaoConsultaRepository
    {
        List<SituacaoConsulta> Listar();

        SituacaoConsulta BuscarPorId(int id);

        void Cadastrar(SituacaoConsulta novoSituacaoConsulta);

        void Atualizar(int id, SituacaoConsulta situacaoConsultaAtualizado);

        void Deletar(int id);
    }
}
