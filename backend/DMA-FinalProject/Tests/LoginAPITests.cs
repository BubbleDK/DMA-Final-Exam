using DMA_FinalProject.API.Controllers;
using DMA_FinalProject.API.DTO;
using DMA_FinalProject.DAL.DAO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Tests
{
    public class LoginAPITests
    {
        private IConfiguration configuration;
        private LoginController loginController;
        EmployeeController employeeController = new EmployeeController(new EmployeeDAO());

        public LoginAPITests()
        {
            InitializeConfiguration();
            InitializeLoginController();
        }

        private void InitializeConfiguration()
        {
            configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();
        }

        private void InitializeLoginController()
        {
            LoginDAO loginDAO = new LoginDAO();
            loginController = new LoginController(loginDAO, configuration);
        }

        [Fact]
        public void TestLoginControllerLoginMethod()
        {
            //Arrange
            EmployeeDTO insertedEmployee = new EmployeeDTO("Bob", "88888888", "Bob@test.dk", "test123", 1);
            employeeController.Add(insertedEmployee);
            LoginDTO loginDTO = new LoginDTO("Bob@test.dk", "test123");

            //Act
            ActionResult<EmployeeDTO> actionResult = loginController.Login(loginDTO);

            //Assert
            Assert.NotNull(actionResult);
            OkObjectResult okResult = (OkObjectResult)actionResult.Result;
            EmployeeDTO employee = (EmployeeDTO)okResult.Value;
            Assert.Equal("Bob@test.dk", employee.Email);

            OkObjectResult result = loginController.CheckToken(employee.Token) as OkObjectResult;
            Assert.NotNull(result);
            Assert.Equal(true, result.Value);

            //Cleanup
            employeeController.Delete("Bob@test.dk");
        }
    }
}
