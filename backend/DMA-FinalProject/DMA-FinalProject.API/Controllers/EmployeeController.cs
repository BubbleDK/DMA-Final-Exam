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

        public EmployeeController(IDMAFinalProjectDAO<Employee> dataAccess, LoginDAO loginDAO)
        {
            this.dataAccess = dataAccess;
            this.loginDAO = loginDAO;
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
            var employee = dataAccess.Get(email).EmployeeToDto();
            if (employee == null) { return NotFound(); }

            return Ok(employee);
        }

        [HttpPost]
        [Route("login")]
        public ActionResult<EmployeeDTO> Login([FromBody] LoginDTO data)
        {
            if (loginDAO.Login(data.Email, data.Password))
            {
                return(Get(data.Email));
            }
            return NotFound();
        }

        [HttpPost]
        public ActionResult<bool> Add([FromBody] EmployeeDTO e)
        {
            e.Password = BCryptTool.HashPassword(e.Password);
            return Ok(dataAccess.Add(e.EmployeeFromDto()));
        }

        [HttpPut]
        public ActionResult<bool> Update(EmployeeDTO e)
        {
            e.Password = BCryptTool.HashPassword(e.Password);
            return Ok(dataAccess.Update(e.EmployeeFromDto()));
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
