namespace DMA-FinalProject.DAL.DAO
{
    /// <summary>
    /// Denne klasse opretter en string som bliver brugt til at oprette forbindelse til databasen.
    /// </summary>
    public static class DBConnection
    {
        public static string ConnectionString
        {
            get { return "Data Source = hildur.ucn.dk; User ID = DMA-CSD-S212_10407505; Password = Password1!; Encrypt = False; TrustServerCertificate = True"; }
        }
    }
}