using DMA_FinalProject.API.Conversion;
using DMA_FinalProject.API.DTO;
using DMA_FinalProject.DAL.DAO;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DMA_FinalProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CookieController : ControllerBase
    {
        private readonly CookieDAO cookieDAO;
        public CookieController(CookieDAO cookieDAO)
        {
            this.cookieDAO = cookieDAO;
        }
        // GET: api/<CookieController>
        [HttpGet]
        public ActionResult<IEnumerable<CookieDTO>> Get()
        {
            return Ok(cookieDAO.GetAll().CookieToDtos());
        }

        // GET api/<CookieController>/5
        [HttpGet("{domainURL}")]
        public ActionResult<CookieDTO> Get(string domainURL)
        {
            return Ok(cookieDAO.Get(domainURL).CookieToDto());
        }

        // POST api/<CookieController>
        [HttpPost]
        public ActionResult<bool> Post([FromBody] CookieDTO cookieDTO)
        {
            return Ok(cookieDAO.Add(cookieDTO.CookieFromDto()));
        }
    }
}
