using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DMA_FinalProject.DAL.Model
{
    public class Employee
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public int CompanyId { get; set; }
    }
}
