using senai.SpMedGroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.SpMedGroup.webApi.Interfaces
{
    interface IMedicoRepository
    {
        List<Medico> Listar();

        Medico BuscarPorIdUsuario(int id);

        void Cadastrar(Medico novoMedico);

        void Atualizar(int id, Medico medicoAtualizado);

        void Deletar(int id);
    }
}
