using senai.SpMedGroup.webApi.Context;
using senai.SpMedGroup.webApi.Domains;
using senai.SpMedGroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.SpMedGroup.webApi.Repositories
{
    public class ClinicaRepository : IClinicaRepository
    {
        SpMedGroupContext ctx = new SpMedGroupContext();
        public void Atualizar(int id, Clinica clinicaAtualizado)
        {
            Clinica clinicaBuscado = ctx.Clinicas.Find(id);

            if (clinicaAtualizado.NomeClinica != null)
            {
                clinicaBuscado.NomeClinica = clinicaAtualizado.NomeClinica;
            }

            if (clinicaAtualizado.EnderecoClinica != null)
            {
                clinicaBuscado.EnderecoClinica = clinicaAtualizado.EnderecoClinica;
            }

            if (clinicaAtualizado.HorarioAbertura != null)
            {
                clinicaBuscado.HorarioAbertura = clinicaAtualizado.HorarioAbertura;
            }

            if (clinicaAtualizado.HorarioFechamento != null)
            {
                clinicaBuscado.HorarioFechamento = clinicaAtualizado.HorarioFechamento;
            }

            ctx.Clinicas.Update(clinicaBuscado);

            ctx.SaveChanges();
        }

        public Clinica BuscarPorId(int id)
        {
            return ctx.Clinicas.FirstOrDefault(c => c.IdClinica == id);
        }

        public void Cadastrar(Clinica novoClinica)
        {
            ctx.Clinicas.Add(novoClinica);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            ctx.Clinicas.Remove(BuscarPorId(id));

            ctx.SaveChanges();
        }

        public List<Clinica> Listar()
        {
            return ctx.Clinicas.ToList();
        }
    }
}
