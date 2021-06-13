using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace senai.SpMedGroup.webApi.Domains
{
    public partial class Consulta
    {
        public int IdConsulta { get; set; }

        [Required(ErrorMessage = "O id do médico é obrigatório")]
        public int IdMedico { get; set; }

        [Required(ErrorMessage = "O id do paciente é obrigatório")]
        public int IdPaciente { get; set; }

        [Required(ErrorMessage = "O id da situação é obrigatório")]
        public int? IdSituacao { get; set; }

        [Required(ErrorMessage = "A data da consulta é obrigatória")]
        [DataType(DataType.DateTime)]
        public DateTime? DataConsulta { get; set; }

        [DataType(DataType.Text)]
        public string Descricao { get; set; }

        public virtual Medico IdMedicoNavigation { get; set; }
        public virtual Paciente IdPacienteNavigation { get; set; }
        public virtual SituacaoConsulta IdSituacaoNavigation { get; set; }
    }
}
