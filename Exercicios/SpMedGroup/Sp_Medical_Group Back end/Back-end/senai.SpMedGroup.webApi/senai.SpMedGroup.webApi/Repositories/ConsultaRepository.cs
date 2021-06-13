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
    public class ConsultaRepository : IConsultaRepository
    {
        SpMedGroupContext ctx = new SpMedGroupContext();
        public void AtualizarDataSituacaoConsulta(int id, Consulta consultaAtualizada)
        {
            Consulta consultaBuscada = ctx.Consulta.Find(id);

            if (consultaAtualizada.DataConsulta != null)
            {
                consultaBuscada.DataConsulta = consultaAtualizada.DataConsulta;
            }

            if (consultaAtualizada.IdSituacao != null)
            {
                consultaBuscada.IdSituacao = consultaAtualizada.IdSituacao;
            }

            ctx.Consulta.Update(consultaBuscada);

            ctx.SaveChanges();
        }

        public void AtualizarDescricaoConsulta(int id, Consulta consultaAtualizada)
        {
            Consulta consultaBuscada = ctx.Consulta.Find(id);

            if (consultaAtualizada.Descricao != null)
            {
                consultaBuscada.Descricao = consultaAtualizada.Descricao;
            }

            ctx.Consulta.Update(consultaBuscada);

            ctx.SaveChanges();
        }

        public Consulta BuscarPorId(int id)
        {
            return ctx.Consulta
                .Include(c => c.IdMedicoNavigation)
                .Include(c => c.IdPacienteNavigation)
                .Include(c => c.IdSituacaoNavigation)
                .Select(c => new Consulta()
                {
                    IdConsulta = c.IdConsulta,
                    IdPaciente = c.IdPaciente,
                    IdSituacao = c.IdSituacao,
                    DataConsulta = c.DataConsulta,
                    Descricao = c.Descricao,

                    IdMedicoNavigation = new Medico()
                    {
                        IdMedico = c.IdMedicoNavigation.IdMedico,
                        NomeMedico = c.IdMedicoNavigation.NomeMedico,
                        IdEspecialidade = c.IdMedicoNavigation.IdEspecialidade,

                        IdEspecialidadeNavigation = new Especialidade()
                        {
                            Especialidade1 = c.IdMedicoNavigation.IdEspecialidadeNavigation.Especialidade1
                        }
                        
                    },

                    IdPacienteNavigation = new Paciente()
                    {
                        IdPaciente = c.IdPacienteNavigation.IdPaciente,
                        NomePaciente = c.IdPacienteNavigation.NomePaciente,
                        Telefone = c.IdPacienteNavigation.Telefone
                    },

                    IdSituacaoNavigation = new SituacaoConsulta()
                    {
                        IdSituacao = c.IdSituacaoNavigation.IdSituacao,
                        Situacao = c.IdSituacaoNavigation.Situacao
                    }
                })
                .FirstOrDefault(c => c.IdConsulta == id);
        }


        public List<Consulta> BuscarPorIdPaciente(int id)
        {
            return ctx.Consulta
                .Where(c => c.IdPaciente == id)
                .Include(c => c.IdMedicoNavigation)
                .Include(c => c.IdSituacaoNavigation)
                .Select(c => new Consulta()
                {
                    IdConsulta = c.IdConsulta,
                    IdPaciente = c.IdPaciente,
                    IdMedico = c.IdMedico,
                    DataConsulta = c.DataConsulta,
                    Descricao = c.Descricao,

                    IdMedicoNavigation = new Medico()
                    {
                        NomeMedico = c.IdMedicoNavigation.NomeMedico,

                        IdEspecialidadeNavigation = new Especialidade()
                        {
                            Especialidade1 = c.IdMedicoNavigation.IdEspecialidadeNavigation.Especialidade1
                        }

                    },
                    IdSituacaoNavigation = new SituacaoConsulta()
                    {
                        Situacao = c.IdSituacaoNavigation.Situacao
                    }
                })
                .ToList();
        }


        public List<Consulta> BuscarPorIdMedico(int id)
        {
            return ctx.Consulta
                .Where(c => c.IdMedico == id && (c.IdSituacao == 1 || c.IdSituacao == 3))
                .Include(c => c.IdPacienteNavigation)
                .Include(c => c.IdSituacaoNavigation)
                .Select(c => new Consulta()
                {
                    IdConsulta = c.IdConsulta,
                    IdPaciente = c.IdPaciente,
                    IdMedico = c.IdMedico,
                    DataConsulta = c.DataConsulta,
                    Descricao = c.Descricao,

                    IdPacienteNavigation = new Paciente()
                    {
                        IdPaciente = c.IdPacienteNavigation.IdPaciente,
                        NomePaciente = c.IdPacienteNavigation.NomePaciente,
                        Telefone = c.IdPacienteNavigation.Telefone
                    },

                    IdSituacaoNavigation = new SituacaoConsulta()
                    {
                        IdSituacao = c.IdSituacaoNavigation.IdSituacao,
                        Situacao = c.IdSituacaoNavigation.Situacao
                    }
                })
                .ToList();
        }

        public void Cadastrar(Consulta novoConsulta)
        {
            ctx.Consulta.Add(novoConsulta);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            ctx.Consulta.Remove(BuscarPorId(id));

            ctx.SaveChanges();
        }

        public List<Consulta> ListarTodas()
        {
            return ctx.Consulta
                .Include(c => c.IdMedicoNavigation)
                .Include(c => c.IdPacienteNavigation)
                .Include(c => c.IdSituacaoNavigation)
                .Select(c => new Consulta()
                {
                    IdConsulta = c.IdConsulta,
                    IdPaciente = c.IdPaciente,
                    IdSituacao = c.IdSituacao,
                    DataConsulta = c.DataConsulta,
                    Descricao = c.Descricao,

                    IdMedicoNavigation = new Medico()
                    {
                        IdMedico = c.IdMedicoNavigation.IdMedico,
                        NomeMedico = c.IdMedicoNavigation.NomeMedico,
                        IdEspecialidade = c.IdMedicoNavigation.IdEspecialidade,

                        IdEspecialidadeNavigation = new Especialidade()
                        {
                            Especialidade1 = c.IdMedicoNavigation.IdEspecialidadeNavigation.Especialidade1
                        }

                    },

                    IdPacienteNavigation = new Paciente()
                    {
                        IdPaciente = c.IdPacienteNavigation.IdPaciente,
                        NomePaciente = c.IdPacienteNavigation.NomePaciente,
                        DataNascimento = c.IdPacienteNavigation.DataNascimento,
                        Telefone = c.IdPacienteNavigation.Telefone
                    },

                    IdSituacaoNavigation = new SituacaoConsulta()
                    {
                        IdSituacao = c.IdSituacaoNavigation.IdSituacao,
                        Situacao = c.IdSituacaoNavigation.Situacao
                    }
                })
                .ToList();
        }
    }
}
