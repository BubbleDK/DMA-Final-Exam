using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DMA_FinalProject.DAL.DAO;
using DMA_FinalProject.DAL.Model;
using DMA_FinalProject.API.DTO;
using DMA_FinalProject.API.Conversion;
using DMA_FinalProject.API.Authentication;

namespace DMA_FinalProject.API.Controllers
{
    [Route("employees")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IDMAFinalProjectDAO<Employee> dataAccess;
        private readonly LoginDAO loginDAO;

        public EmployeeController(IDMAFinalProjectDAO<Employee> dataAccess)
        {
            this.dataAccess = dataAccess;
        }

        [HttpGet]
        public ActionResult<IEnumerable<EmployeeDTO>> GetAll()
        {
            return Ok(dataAccess.GetAll().EmployeeToDtos());
        }

        [HttpGet]
        [Route("{email}")]
        public ActionResult<EmployeeDTO> Get(string email)
        {
            var product = dataAccess.Get(email).EmployeeToDto();
            if (product == null) { return NotFound(); }

            return Ok(product);
        }

        [HttpGet]
        [Route("GetHashByEmail")]
        public ActionResult<EmployeeDTO> GetHashByEmail(string email)
        {
            return Ok(loginDAO.GetHashByEmail(email));
        }

        [HttpPost]
        public ActionResult<bool> Add([FromBody] EmployeeDTO p)
        {
            p.PasswordHash = BCryptTool.HashPassword(p.PasswordHash);
            return Ok(dataAccess.Add(p.EmployeeFromDto()));
        }

        [HttpPut]
        public ActionResult<bool> Update(EmployeeDTO p)
        {
            p.PasswordHash = BCryptTool.HashPassword(p.PasswordHash);
            return Ok(dataAccess.Update(p.EmployeeFromDto()));
        }

        [HttpDelete("{email}")]
        public ActionResult<bool> Delete(string email)
        {
            if (dataAccess.Remove(email))
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
