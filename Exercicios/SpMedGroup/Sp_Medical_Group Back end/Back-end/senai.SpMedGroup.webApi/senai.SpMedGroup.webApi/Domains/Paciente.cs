using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace senai.SpMedGroup.webApi.Domains
{
    public partial class Paciente
    {
        public Paciente()
        {
            Consulta = new HashSet<Consulta>();
        }

        public int IdPaciente { get; set; }

        [Required(ErrorMessage = "O id do usuário é obrigatório")]
        public int? IdUsuario { get; set; }

        [Required(ErrorMessage = "O nome do paciente é obrigatório")]
        public string NomePaciente { get; set; }
        public string Telefone { get; set; }

        [Required(ErrorMessage = "O RG do paciente é obrigatório")]
        public string Rg { get; set; }

        [Required(ErrorMessage = "O CPF do paciente é obrigatório")]
        public string Cpf { get; set; }

        [Required(ErrorMessage = "A data de nascimento é obrigatória")]
        public DateTime DataNascimento { get; set; }

        [Required(ErrorMessage = "O endereço é obrigatório")]
        public string Endereco { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<Consulta> Consulta { get; set; }
    }
}
