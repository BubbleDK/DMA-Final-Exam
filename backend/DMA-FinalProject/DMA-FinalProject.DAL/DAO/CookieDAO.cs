using DMA_FinalProject.DAL.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DMA_FinalProject.DAL.DAO
{
    public class CookieDAO
    {
        public bool Add(Cookie cookie)
        {
            SqlTransaction trans;
            using (SqlConnection conn = new SqlConnection(DBConnection.ConnectionString))
            {
                conn.Open();
                using (trans = conn.BeginTransaction())
                {
                    try
                    {
                            using (SqlCommand insertCommand = new SqlCommand(
                                "INSERT INTO fp_Cookie VALUES (@name, @value, @expirationdate, @domainurl, @category);", conn, trans))
                            {
                                insertCommand.Parameters.AddWithValue("@name", cookie.Name);
                                insertCommand.Parameters.AddWithValue("@value", cookie.Value);
                                insertCommand.Parameters.AddWithValue("@expirationdate", cookie.ExpirationDate);
                                insertCommand.Parameters.AddWithValue("@domainurl", cookie.DomainURL);
                                insertCommand.Parameters.AddWithValue("@category", cookie.Category);
                                insertCommand.ExecuteNonQuery();
                            }
                            trans.Commit();
                    }
                    catch (Exception)
                    {
                        trans.Rollback();
                        throw;
                    }
                }
            }
            return true;
        }

        public Cookie Get(dynamic key)
        {
            using (SqlConnection conn = new SqlConnection(DBConnection.ConnectionString))
            {
                using SqlCommand command = new SqlCommand(
                    "SELECT name, value, expirationdate, domainurl, category FROM fp_Cookie WHERE domainurl = @domainurl", conn);
                command.Parameters.AddWithValue("@domainurl", key);
                {
                    try
                    {
                        conn.Open();
                        SqlDataReader reader = command.ExecuteReader();
                        while (reader.Read())
                        {
                            Cookie cookie = new()
                            {
                                Name = (string)reader["name"],
                                Value = (string)reader["value"],
                                ExpirationDate = (DateTime)reader["expirationdate"],
                                DomainURL = (string)reader["domainurl"],
                                Category = (string)reader["category"]
                            };
                            return cookie;
                        }
                    }
                    catch (Exception)
                    {

                        throw;
                    }
                }
            }
            return null;
        }

        public IEnumerable<Cookie> GetAll()
        {
            string sqlStatement = "SELECT * FROM fp_Cookie;";
            List<Cookie> cookies = new();

            using (SqlConnection conn = new SqlConnection(DBConnection.ConnectionString))
            {
                SqlCommand getAllCommand = new SqlCommand(sqlStatement, conn);
                try
                {
                    conn.Open();
                    SqlDataReader reader = getAllCommand.ExecuteReader();
                    while (reader.Read())
                    {
                        Cookie cookie = new()
                        {
                            Name = (string)reader["name"],
                            Value = (string)reader["value"],
                            ExpirationDate = (DateTime)reader["expirationdate"],
                            DomainURL = (string)reader["domainurl"],
                            Category = (string)reader["category"]
                        };
                        cookies.Add(cookie);
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
            return cookies;
        }
    }
}
