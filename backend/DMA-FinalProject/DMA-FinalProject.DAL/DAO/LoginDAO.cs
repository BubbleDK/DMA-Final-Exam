using DMA_FinalProject.DAL.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DMA_FinalProject.API.

namespace DMA_FinalProject.DAL.DAO
{
    public class LoginDAO
    {
        public Employee Login(string email, string password)
        {
            EmployeeDAO employeeDAO = new EmployeeDAO();
            string hashedPassword = GetHashByEmail(email);
            if (hashedPassword != null)
            {
                if (BCryptTool.ValidatePassword(password, hashedPassword))
                {
                    return employeeDAO.Get(email);    
                } 
                else
                {
                    throw new Exception("Wrong password");
                }
            }
            else
            {
                throw new Exception("No match on email");
            }
        }
        
        public string GetHashByEmail(string email)
        {
            string sqlStatement = "SELECT passwordHash from fp_employee where email = @email";
            using (SqlConnection conn = new SqlConnection(DBConnection.ConnectionString))
            {
                string passwordHash = null;
                SqlCommand cmd = new SqlCommand(sqlStatement, conn);
                cmd.Parameters.AddWithValue("@email", email);
                try
                {
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        passwordHash = (string)reader["passwordhash"];
                    }
                }
                catch (Exception)
                {
                    throw;
                }
                return passwordHash;
            }
        }
    }
}
