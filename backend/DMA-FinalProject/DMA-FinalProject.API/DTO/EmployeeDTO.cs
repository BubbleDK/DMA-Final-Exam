namespace DMA_FinalProject.API.DTO
{
    public class EmployeeDTO
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public int CompanyId { get; set; }
        public string Token { get; set; } = string.Empty;
    }
}
