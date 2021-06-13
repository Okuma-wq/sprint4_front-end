using senai.SpMedGroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.SpMedGroup.webApi.Interfaces
{
    interface IClinicaRepository
    {
        List<Clinica> Listar();

        Clinica BuscarPorId(int id);

        void Cadastrar(Clinica novoClinica);

        void Atualizar(int id, Clinica clinicaAtualizado);

        void Deletar(int id);
    }
}
