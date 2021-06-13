using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace senai.SpMedGroup.webApi.Domains
{
    public partial class Clinica
    {
        public Clinica()
        {
            Medicos = new HashSet<Medico>();
        }

        public int IdClinica { get; set; }

        [Required(ErrorMessage = "O nome da clínica é obrigatório")]
        public string NomeClinica { get; set; }

        [Required(ErrorMessage = "O CNPJ é obrigatório")]
        public string Cnpj { get; set; }

        [Required(ErrorMessage = "A Razão Social é obrigatória")]
        public string RazaoSocial { get; set; }

        [Required(ErrorMessage = "O endereço é obrigatório")]
        public string EnderecoClinica { get; set; }

        [Required(ErrorMessage = "O horário de abertura é obrigatório")]
        [DataType(DataType.Time)]
        public TimeSpan? HorarioAbertura { get; set; }

        [Required(ErrorMessage = "O horário de fechamento é obrigatório")]
        [DataType(DataType.Time)]
        public TimeSpan? HorarioFechamento { get; set; }

        public virtual ICollection<Medico> Medicos { get; set; }
    }
}
