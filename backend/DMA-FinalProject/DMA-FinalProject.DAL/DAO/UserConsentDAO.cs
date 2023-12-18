using DMA_FinalProject.DAL.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DMA_FinalProject.DAL.DAO
{
    public class UserConsentDAO
    {
        public bool Add(UserConsent userConsent)
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
                            "INSERT INTO fp_userconsent VALUES (@date, @cookieID, @userID);", conn, trans))
                        {
                            insertCommand.Parameters.AddWithValue("@date", DateTime.Now);
                            insertCommand.Parameters.AddWithValue("@cookieID", userConsent.CookieId);
                            insertCommand.Parameters.AddWithValue("@userID", userConsent.UserId);
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

        public IEnumerable<UserConsent> Get(string userId)
        {
            List<UserConsent> userConsentList = new List<UserConsent>();

            using (SqlConnection conn = new SqlConnection(DBConnection.ConnectionString))
            {
                using SqlCommand command = new SqlCommand(
                    "SELECT * FROM fp_UserConsent WHERE userId = @userId", conn);
                command.Parameters.AddWithValue("@userId", userId);
                {
                    try
                    {
                        conn.Open();
                        SqlDataReader reader = command.ExecuteReader();
                        while (reader.Read())
                        {
                            UserConsent userConsent;
                            userConsent = new()
                            {
                                CookieId = (int)reader["cookieID"],
                                UserId = (string)reader["userID"],
                            };
                            userConsentList.Add(userConsent);
                        }
                    }
                    catch (Exception)
                    {
                        throw;
                    }
                }
            }
            return userConsentList;
        }
        
        public bool Remove(int cookieId, string userId)
        {
            SqlTransaction trans;
            using (SqlConnection conn = new SqlConnection(DBConnection.ConnectionString))
            {
                conn.Open();
                using (trans = conn.BeginTransaction())
                {
                    try
                    {
                        using (SqlCommand deleteCommand = new SqlCommand("DELETE FROM fp_UserConsent WHERE cookieID = @cookieID AND userID = @userID", conn, trans))
                        {
                            deleteCommand.Parameters.AddWithValue("@cookieID", cookieId);
                            deleteCommand.Parameters.AddWithValue("@userID", userId);
                            deleteCommand.ExecuteNonQuery();
                            trans.Commit();
                            return true;
                        }
                    }
                    catch (Exception)
                    {
                        trans.Rollback();
                        throw;
                    }
                }
            }
        }
    }
}
