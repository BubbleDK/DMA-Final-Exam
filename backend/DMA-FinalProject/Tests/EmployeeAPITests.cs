using DMA_FinalProject.API;
using DMA_FinalProject.API.Controllers;
using DMA_FinalProject.API.DTO;
using DMA_FinalProject.DAL.DAO;
using DMA_FinalProject.DAL.Model;
using Microsoft.AspNetCore.Mvc;

namespace Tests
{
    public class EmployeeAPITests
    {
        EmployeeController employeeController = new EmployeeController(new EmployeeDAO());

        [Fact]
        public void TestEmployeeAdd()
        {
            //Arrange
            EmployeeDTO employee = new EmployeeDTO("Bob", "88888888", "Bob@test.dk", "password123", 1);

            //Act
            ActionResult<bool> actionResult = employeeController.Add(employee);

            //Assert
            Assert.NotNull(actionResult);

            // Check if the HTTP status code is 200 OK
            Assert.IsType<OkObjectResult>(actionResult.Result);

            // Extract the value from OkObjectResult and check if it's true
            bool resultValue = (bool)((OkObjectResult)actionResult.Result).Value;
            Assert.True(resultValue);

            //Cleanup after
            employeeController.Delete("Bob@test.dk");
        }

        [Fact]
        public void TestEmployeeGet()
        {
            //Arrange
            //Inserting a user to get
            EmployeeDTO insertedEmployee = new EmployeeDTO("Bob", "88888888", "Bob@test.dk", "password123", 1);
            employeeController.Add(insertedEmployee);

            //Act
            ActionResult<EmployeeDTO> actionResult = employeeController.Get("Bob@test.dk");

            //Assert
            Assert.NotNull(actionResult);

            //Check if the returned employee matches the input email
            OkObjectResult okResult = (OkObjectResult)actionResult.Result;
            EmployeeDTO employee = (EmployeeDTO)okResult.Value;
            Assert.Equal("Bob@test.dk", employee.Email);

            //Cleanup after
            employeeController.Delete("Bob@test.dk");
        }

        [Fact]
        public void TestEmployeeGetAll()
        {
            //Arrange
            //Inserting some test data
            EmployeeDTO employee = new EmployeeDTO("Bob", "88888888", "Bob@test.dk", "password123", 1);
            employeeController.Add(employee);
            EmployeeDTO employee2 = new EmployeeDTO("Bobby", "77777777", "Bobby@test.dk", "password456", 1);
            employeeController.Add(employee2);
            EmployeeDTO employee3 = new EmployeeDTO("Bobber", "99999999", "Bobber@test.dk", "password789", 1);
            employeeController.Add(employee3);


            //Act
            ActionResult<IEnumerable<EmployeeDTO>> actionResult = employeeController.GetAll();

            //Assert
            Assert.NotNull(actionResult);

            //Check if the HTTP status code is 200 OK
            Assert.IsType<OkObjectResult>(actionResult.Result);
            OkObjectResult result = (OkObjectResult)actionResult.Result;
            Assert.IsType<List<EmployeeDTO>>(((IEnumerable<EmployeeDTO>)result.Value).ToList());

            //Cleanup after
            employeeController.Delete("Bob@test.dk");
            employeeController.Delete("Bobby@test.dk");
            employeeController.Delete("Bobber@test.dk");
        }

        [Fact]
        public void TestEmployeeUpdate()
        {
            //Arrange
            //Insert an employee to be updated
            EmployeeDTO employee = new EmployeeDTO("Bob", "88888888", "Bob@test.dk", "password123", 1);
            employeeController.Add(employee);

            //Act
            employee.Name = "Bobster";
            employee.Phone = "12345678";
            ActionResult<bool> actionResult = employeeController.Update(employee);

            //Assert
            Assert.NotNull(actionResult);

            // Check if the HTTP status code is 200 OK
            Assert.IsType<OkObjectResult>(actionResult.Result);

            // Extract the value from OkObjectResult and check if it's true
            bool resultValue = (bool)((OkObjectResult)actionResult.Result).Value;
            Assert.True(resultValue);

            //Cleanup after
            employeeController.Delete("Bob@test.dk");
        }

        [Fact]
        public void TestEmployeeDelete()
        {
            //Arrange
            EmployeeDTO employee = new EmployeeDTO("Bob", "88888888", "Bob@test.dk", "password123", 1);
            employeeController.Add(employee);

            //Act
            ActionResult<bool> actionResult = employeeController.Delete("Bob@test.dk");

            //Assert
            Assert.NotNull(actionResult);

            // Check if the HTTP status code is 200 OK
            Assert.IsType<OkResult>(actionResult.Result);
            Assert.Equal(200, (actionResult.Result as OkResult)?.StatusCode);
        }
    }
}