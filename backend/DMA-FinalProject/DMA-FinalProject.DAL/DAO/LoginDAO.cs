using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DMA_FinalProject.DAL.DAO
{
    public class LoginDAO
    {
        public string GetHashByEmail(string email)
        {
            string sqlStatement = "SELECT email, passwordHash from fp_employee where @email = email";
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
                        passwordHash = (string)reader["PasswordHash"];
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
