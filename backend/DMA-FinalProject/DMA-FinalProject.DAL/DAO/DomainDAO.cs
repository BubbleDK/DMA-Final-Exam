﻿using DMA_FinalProject.DAL.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DMA_FinalProject.DAL.DAO
{
    public class DomainDAO
    {
        public bool Add(Domain domain)
        {
            SqlTransaction trans;
            using (SqlConnection conn = new SqlConnection(DBConnection.ConnectionString))
            {
                conn.Open();
                using ( trans = conn.BeginTransaction())
                {
                    try
                    {
                        using (SqlCommand insertCommand = new SqlCommand(
                            "INSERT INTO fp_domain VALUES (@url, @name, @companyId);", conn, trans))
                        {
                            insertCommand.Parameters.AddWithValue("@url", domain.Url);
                            insertCommand.Parameters.AddWithValue("@name", domain.Name);
                            insertCommand.Parameters.AddWithValue("@companyId", domain.CompanyId);
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

        public IEnumerable<Domain> Get(int companyId)
        {
            List<Domain> domainList = new List<Domain>();

            using (SqlConnection conn = new SqlConnection(DBConnection.ConnectionString))
            {
                using SqlCommand command = new SqlCommand(
                    "SELECT * FROM fp_Domain WHERE companyId = @companyId", conn);
                command.Parameters.AddWithValue("@companyId", companyId);
                {
                    try
                    {
                        conn.Open();
                        SqlDataReader reader = command.ExecuteReader();
                        while (reader.Read())
                        {
                            Domain domain = new Domain()
                            {
                                Url = (string)reader["url"],
                                Name = (string)reader["name"],
                                CompanyId = (int)reader["companyID"]
                            };
                            domainList.Add(domain);
                        }
                    }
                    catch (Exception)
                    {

                        throw;
                    }
                }
            }
            return domainList;
        }

        public IEnumerable<Domain> GetAll()
        {
            string sqlStatement = "SELECT * FROM fp_Domain;";
            List<Domain> domains = new();

            using (SqlConnection conn = new SqlConnection(DBConnection.ConnectionString))
            {
                SqlCommand getAllCommand = new SqlCommand(sqlStatement, conn);
                try
                {
                    conn.Open();
                    SqlDataReader reader = getAllCommand.ExecuteReader();
                    while (reader.Read())
                    {
                        Domain domain = new()
                        {
                            Url = (string)reader["url"],
                            Name = (string)reader["name"],
                            CompanyId = (int)reader["companyID"]
                        };
                        domains.Add(domain);
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
            return domains;
        }

        public bool Remove(dynamic key)
        {
            throw new NotImplementedException();
        }

        public bool Update(Domain o)
        {
            throw new NotImplementedException();
        }
    }
}