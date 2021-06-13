using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace senai.SpMedGroup.webApi.Domains
{
    public partial class Medico
    {
        public Medico()
        {
            Consulta = new HashSet<Consulta>();
        }

        public int IdMedico { get; set; }

        [Required(ErrorMessage = "O id da especialidade é obrigatório")]
        public int IdEspecialidade { get; set; }

        [Required(ErrorMessage = "O id da clinica é obrigatório")]
        public int IdClinica { get; set; }

        [Required(ErrorMessage = "O id do usuário é obrigatório")]
        public int IdUsuario { get; set; }

        [Required(ErrorMessage = "O nome do médico é obrigatório")]
        public string NomeMedico { get; set; }

        [Required(ErrorMessage = "O CRM é obrigatório")]
        public string Crm { get; set; }

        public virtual Clinica IdClinicaNavigation { get; set; }
        public virtual Especialidade IdEspecialidadeNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<Consulta> Consulta { get; set; }
    }
}
