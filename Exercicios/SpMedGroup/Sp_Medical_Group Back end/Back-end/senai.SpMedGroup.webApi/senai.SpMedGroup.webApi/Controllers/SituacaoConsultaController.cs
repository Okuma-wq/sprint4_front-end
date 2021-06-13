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
    public class SituacaoConsultaController : ControllerBase
    {
        private ISituacaoConsultaRepository _situacaoConsultaRepository { get; set; }

        public SituacaoConsultaController()
        {
            _situacaoConsultaRepository = new SituacaoConsultaRepository();
        }

        //[Authorize(Roles = "1")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_situacaoConsultaRepository.Listar().OrderBy(c => c.IdSituacao));
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
                return Ok(_situacaoConsultaRepository.BuscarPorId(id));
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Post(SituacaoConsulta novoSituacaoConsulta)
        {
            try
            {
                _situacaoConsultaRepository.Cadastrar(novoSituacaoConsulta);

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
                _situacaoConsultaRepository.Deletar(id);
                return StatusCode(200);
            }
            catch (Exception codErro)
            {
                return BadRequest(codErro);

            }
        }

        [Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, SituacaoConsulta situacaoConsultaAtualizado)
        {
            try
            {
                _situacaoConsultaRepository.Atualizar(id, situacaoConsultaAtualizado);

                return StatusCode(200);
            }
            catch (Exception codErro)
            {
                return BadRequest(codErro);
            }
        }
    }
}
