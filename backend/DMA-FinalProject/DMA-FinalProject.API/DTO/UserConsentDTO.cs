namespace DMA_FinalProject.API.DTO
{
    public class UserConsentDTO
    {
        public int CookieId { get; set; }
        public string UserId { get; set; }

        public UserConsentDTO()
        {

        }

        public UserConsentDTO(int cookieId, string userId)
        {
            CookieId = cookieId;
            UserId = userId;
        }
    }
}
