using senai.SpMedGroup.webApi.Context;
using senai.SpMedGroup.webApi.Domains;
using senai.SpMedGroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.SpMedGroup.webApi.Repositories
{
    public class EspecialidadeRepository : IEspecialidadeRepository
    {
        SpMedGroupContext ctx = new SpMedGroupContext();
        public void Atualizar(int id, Especialidade especialidadeAtualizado)
        {
            Especialidade especialidadeBuscado = ctx.Especialidades.Find(id);

            if (especialidadeAtualizado.Especialidade1 != null)
            {
                especialidadeBuscado.Especialidade1 = especialidadeAtualizado.Especialidade1;
            }

            ctx.Especialidades.Update(especialidadeBuscado);

            ctx.SaveChanges();
        }

        public Especialidade BuscarPorId(int id)
        {
            return ctx.Especialidades.FirstOrDefault(c => c.IdEspecialidade == id);
        }

        public void Cadastrar(Especialidade novoEspecialidade)
        {
            ctx.Especialidades.Add(novoEspecialidade);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            ctx.Especialidades.Remove(BuscarPorId(id));

            ctx.SaveChanges();
        }

        public List<Especialidade> Listar()
        {
            return ctx.Especialidades.ToList();
        }
    }
}
