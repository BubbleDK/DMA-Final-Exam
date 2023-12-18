using DMA_FinalProject.API.DTO;
using DMA_FinalProject.DAL.DAO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using DMA_FinalProject.API.Conversion;

namespace DMA_FinalProject.API.Controllers
{
    [Route("userConsent")]
    [ApiController]
    public class UserConsentController : ControllerBase
    {
        private readonly UserConsentDAO dataAccess;

        public UserConsentController(UserConsentDAO dataAccess)
        {
            this.dataAccess = dataAccess;
        }

        [HttpGet]
        [Route("{browserId}")]
        public ActionResult<IEnumerable<UserConsentDTO>> Get(string browserId)
        {
            return Ok(dataAccess.Get(browserId).UserConsentToDtos());
        }

        [HttpPost]
        public ActionResult<bool> Add([FromBody] UserConsentDTO uc)
        {
            return Ok(dataAccess.Add(uc.UserConsentFromDto()));
        }

        [HttpDelete]
        [Route("{cookieId}/{browserId}")]
        public ActionResult<bool> Delete(int cookieId, string browserId)
        {
            return Ok(dataAccess.Remove(cookieId, browserId));   
        }
    }
}
