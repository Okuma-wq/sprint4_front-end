using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai.SpMedGroup.webApi.Domains;
using senai.SpMedGroup.webApi.Interfaces;
using senai.SpMedGroup.webApi.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.SpMedGroup.webApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }

        public UsuarioController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [Authorize(Roles = "1")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_usuarioRepository.Listar().OrderBy(c => c.IdUsuario));
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        [Authorize(Roles = "1")]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                return Ok(_usuarioRepository.BuscarPorId(id));
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Post(Usuario novoUsuario)
        {
            try
            {
                _usuarioRepository.Cadastrar(novoUsuario);

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
                _usuarioRepository.Deletar(id);
                return StatusCode(200);
            }
            catch (Exception codErro)
            {
                return BadRequest(codErro);

            }
        }

        [Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, Usuario usuarioAtualizado)
        {
            try
            {
                _usuarioRepository.Atualizar(id, usuarioAtualizado);

                return StatusCode(200);
            }
            catch (Exception codErro)
            {
                return BadRequest(codErro);
            }
        }
    }
}
