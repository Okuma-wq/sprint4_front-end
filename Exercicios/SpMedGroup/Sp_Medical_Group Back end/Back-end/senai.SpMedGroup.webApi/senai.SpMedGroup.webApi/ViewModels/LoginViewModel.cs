using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace senai.SpMedGroup.webApi.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "O campo Email deve ser informado")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo Senha deve ser informado")]
        public string Senha { get; set; }
    }
}
