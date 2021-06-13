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
    public class TipoUsuarioController : ControllerBase
    {
        private ITipoUsuarioRepository _tipoUsuarioRepository { get; set; }

        public TipoUsuarioController()
        {
            _tipoUsuarioRepository = new TipoUsuarioRepository();
        }

        [Authorize(Roles = "1")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_tipoUsuarioRepository.Listar().OrderBy(c => c.IdTipoUsuario));
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
                return Ok(_tipoUsuarioRepository.BuscarPorId(id));
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Post(TipoUsuario novoTipoUsuario)
        {
            try
            {
                _tipoUsuarioRepository.Cadastrar(novoTipoUsuario);

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
                _tipoUsuarioRepository.Deletar(id);
                return StatusCode(200);
            }
            catch (Exception codErro)
            {
                return BadRequest(codErro);

            }
        }

        [Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, TipoUsuario tipoUsuarioAtualizado)
        {
            try
            {
                _tipoUsuarioRepository.Atualizar(id, tipoUsuarioAtualizado);

                return StatusCode(200);
            }
            catch (Exception codErro)
            {
                return BadRequest(codErro);
            }
        }
    }
}
