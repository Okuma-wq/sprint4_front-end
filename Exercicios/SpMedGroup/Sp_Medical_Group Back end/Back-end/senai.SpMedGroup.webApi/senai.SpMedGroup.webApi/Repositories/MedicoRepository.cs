using Microsoft.EntityFrameworkCore;
using senai.SpMedGroup.webApi.Context;
using senai.SpMedGroup.webApi.Domains;
using senai.SpMedGroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.SpMedGroup.webApi.Repositories
{
    public class MedicoRepository : IMedicoRepository
    {
        SpMedGroupContext ctx = new SpMedGroupContext();
        public void Atualizar(int id, Medico medicoAtualizado)
        {
            Medico medicoBuscado = ctx.Medicos.Find(id);

            if (medicoAtualizado.NomeMedico != null)
            {
                medicoBuscado.NomeMedico = medicoAtualizado.NomeMedico;
            }

            ctx.Medicos.Update(medicoBuscado);

            ctx.SaveChanges();
        }

        public Medico BuscarPorIdUsuario(int id)
        {
            return ctx.Medicos
                .Include(m => m.IdEspecialidadeNavigation)
                .FirstOrDefault(c => c.IdUsuario == id);
        }

        public void Cadastrar(Medico novoMedico)
        {
            ctx.Medicos.Add(novoMedico);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            ctx.Medicos.Remove(BuscarPorIdUsuario(id));

            ctx.SaveChanges();
        }

        public List<Medico> Listar()
        {
            return ctx.Medicos
                .Include(m => m.IdEspecialidadeNavigation)
                .ToList();
        }
    }
}
