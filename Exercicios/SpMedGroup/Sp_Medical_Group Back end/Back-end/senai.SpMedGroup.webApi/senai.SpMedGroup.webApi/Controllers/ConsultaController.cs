using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai.SpMedGroup.webApi.Domains;
using senai.SpMedGroup.webApi.Interfaces;
using senai.SpMedGroup.webApi.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace senai.SpMedGroup.webApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultaController : ControllerBase
    {
        private IConsultaRepository _consultaRepository { get; set; }
        private IPacienteRepository _pacienteRepository { get; set; }
        private IMedicoRepository _medicoRepository { get; set; }

        public ConsultaController()
        {
            _consultaRepository = new ConsultaRepository();
            _pacienteRepository = new PacienteRepository();
            _medicoRepository = new MedicoRepository();
        }

        //[Authorize(Roles = "1")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_consultaRepository.ListarTodas().OrderByDescending(c => c.DataConsulta));
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        //[Authorize(Roles = "2")]
        [HttpGet("Medico")]
        public IActionResult GetByIdMedico()
        {
            try
            {
                int idUsuario = Convert.ToInt32( HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value );

                var Medico = _medicoRepository.BuscarPorIdUsuario(idUsuario);

                return Ok(_consultaRepository.BuscarPorIdMedico(Medico.IdMedico).OrderByDescending(c => c.IdConsulta));
            }
            catch (Exception ex)
            {

                return BadRequest(new
                {
                    mensagem = "Não é possivel mostrar as consultas se o usuário não estiver logado!",
                    ex
                });
            }
        }

        [Authorize(Roles = "3")]
        [HttpGet("Paciente")]
        public IActionResult GetByIdPaciente()
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(id => id.Type == JwtRegisteredClaimNames.Jti).Value);

                var paciente = _pacienteRepository.BuscarPorIdUsuario(idUsuario);

                return Ok(_consultaRepository.BuscarPorIdPaciente(paciente.IdPaciente).OrderByDescending(c => c.IdConsulta));
            }
            catch (Exception ex)
            {

                return BadRequest(new
                {
                    mensagem = "Não é possivel mostrar as consultas se o usuário não estiver logado!",
                    ex
                });
            }
        }

        //[Authorize(Roles = "1")]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                return Ok(_consultaRepository.BuscarPorId(id));
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        //[Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Post(Consulta novoConsulta)
        {
            try
            {
                _consultaRepository.Cadastrar(novoConsulta);

                return StatusCode(201);
            }
            catch (Exception codErro)
            {
                return BadRequest(codErro);
            }

        }

        [Authorize(Roles = "1")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _consultaRepository.Deletar(id);
                return StatusCode(200);
            }
            catch (Exception codErro)
            {
                return BadRequest(codErro);

            }
        }

        //[Authorize(Roles = "1")]
        [HttpPut("Adm/{id}")]
        public IActionResult UpdateDataSituacao(int id, Consulta consultaAtualizado)
        {
            try
            {
                _consultaRepository.AtualizarDataSituacaoConsulta(id, consultaAtualizado);
                return StatusCode(200);
            }
            catch (Exception codErro)
            {
                return BadRequest(codErro);
            }
        }

        [Authorize(Roles = "2")]
        [HttpPut("Medico/{id}")]
        public IActionResult UpdateDescricao(int id, Consulta consultaAtualizado)
        {
            try
            {
                _consultaRepository.AtualizarDescricaoConsulta(id, consultaAtualizado);
                return StatusCode(200);
            }
            catch (Exception codErro)
            {
                return BadRequest(codErro);
            }
        }
    }
}
