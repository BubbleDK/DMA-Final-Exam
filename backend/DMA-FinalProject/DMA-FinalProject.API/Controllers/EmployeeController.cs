using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DMA_FinalProject.DAL.DAO;
using DMA_FinalProject.DAL.Model;

namespace DMA_FinalProject.API.Controllers
{
    [Route("employees")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IDMAFinalProjectDAO<Employee> dataAccess;

    }
}
