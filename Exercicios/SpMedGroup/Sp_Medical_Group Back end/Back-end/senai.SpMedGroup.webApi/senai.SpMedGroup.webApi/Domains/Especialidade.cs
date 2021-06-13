using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace senai.SpMedGroup.webApi.Domains
{
    public partial class Especialidade
    {
        public Especialidade()
        {
            Medicos = new HashSet<Medico>();
        }

        public int IdEspecialidade { get; set; }

        [Required(ErrorMessage = "O tipo de especialidade é obrigatório")]
        public string Especialidade1 { get; set; }

        public virtual ICollection<Medico> Medicos { get; set; }
    }
}
