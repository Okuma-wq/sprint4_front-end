using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Xunit;

#nullable disable

namespace senai.SpMedGroup.webApi.Domains
{
    public partial class SituacaoConsulta
    {
        public SituacaoConsulta()
        {
            Consulta = new HashSet<Consulta>();
        }

        public int IdSituacao { get; set; }

        [Required(ErrorMessage = "O tipo de situação da consulta é obrigatório")]
        public string Situacao { get; set; }

        public virtual ICollection<Consulta> Consulta { get; set; }
    }
}
