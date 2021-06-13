using senai.SpMedGroup.webApi.Context;
using senai.SpMedGroup.webApi.Domains;
using senai.SpMedGroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.SpMedGroup.webApi.Repositories
{
    public class SituacaoConsultaRepository : ISituacaoConsultaRepository
    {
        SpMedGroupContext ctx = new SpMedGroupContext();
        public void Atualizar(int id, SituacaoConsulta situacaoConsultaAtualizado)
        {
            SituacaoConsulta situacaoConsultaBuscado = ctx.SituacaoConsulta.Find(id);

            if (situacaoConsultaAtualizado.Situacao != null)
            {
                situacaoConsultaBuscado.Situacao = situacaoConsultaAtualizado.Situacao;
            }

            ctx.SituacaoConsulta.Update(situacaoConsultaBuscado);

            ctx.SaveChanges();
        }

        public SituacaoConsulta BuscarPorId(int id)
        {
            return ctx.SituacaoConsulta.FirstOrDefault(c => c.IdSituacao == id);
        }

        public void Cadastrar(SituacaoConsulta novoSituacaoConsulta)
        {
            ctx.SituacaoConsulta.Add(novoSituacaoConsulta);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            ctx.SituacaoConsulta.Remove(BuscarPorId(id));

            ctx.SaveChanges();
        }

        public List<SituacaoConsulta> Listar()
        {
            return ctx.SituacaoConsulta.ToList();
        }
    }
}
