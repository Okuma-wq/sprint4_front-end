using senai.SpMedGroup.webApi.Context;
using senai.SpMedGroup.webApi.Domains;
using senai.SpMedGroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.SpMedGroup.webApi.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        SpMedGroupContext ctx = new SpMedGroupContext();
        public void Atualizar(int id, Paciente pacienteAtualizado)
        {
            Paciente pacienteBuscado = ctx.Pacientes.Find(id);

            if (pacienteAtualizado.NomePaciente != null)
            {
                pacienteBuscado.NomePaciente = pacienteAtualizado.NomePaciente;
            }

            if (pacienteAtualizado.Telefone != null)
            {
                pacienteBuscado.Telefone = pacienteAtualizado.Telefone;
            }

            if (pacienteAtualizado.Endereco != null)
            {
                pacienteBuscado.Endereco = pacienteAtualizado.Endereco;
            }

            ctx.Pacientes.Update(pacienteBuscado);

            ctx.SaveChanges();
        }

        public Paciente BuscarPorIdUsuario(int id)
        {
            return ctx.Pacientes.FirstOrDefault(c => c.IdUsuario == id);
        }

        public void Cadastrar(Paciente novoPaciente)
        {
            ctx.Pacientes.Add(novoPaciente);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            ctx.Pacientes.Remove(BuscarPorIdUsuario(id));

            ctx.SaveChanges();
        }

        public List<Paciente> Listar()
        {
            return ctx.Pacientes.ToList();
        }
    }
}
