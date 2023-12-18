using DMA_FinalProject.API.Controllers;
using DMA_FinalProject.API.DTO;
using DMA_FinalProject.DAL.DAO;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests
{
    public class CookieAPITests
    {

        [Fact]
        public void TestCookieControllerCreateRead()
        {
            //Arrange
            CookieDAO cookieDAO = new CookieDAO();
            CookieController cookieController = new CookieController(cookieDAO);
            CookieDTO testCookie = new CookieDTO("TestCookie", "TestValue", new DateTime(1999, 1, 1), "www.company1.com", "TestCategory");

            //Act
            ActionResult<bool> actionResultAdd = cookieController.Add(testCookie);
            ActionResult<IEnumerable<CookieDTO>> actionResultGet = cookieController.Get("www.company1.com");

            bool actionResultAddValue = (bool)((OkObjectResult)actionResultAdd.Result).Value;
            OkObjectResult okObjectResult = Assert.IsType<OkObjectResult>(actionResultGet.Result);
            IEnumerable<CookieDTO> cookiesList = (IEnumerable<CookieDTO>)okObjectResult.Value;

            //Assert
            Assert.NotNull(actionResultAdd);
            Assert.NotNull(actionResultGet);
            Assert.NotNull(cookiesList);
            Assert.Contains(cookiesList, cookie => cookie.Name == "TestCookie");
            Assert.True(actionResultAddValue);

            cookieDAO.Remove("TestCookie");
        }
    }
}
