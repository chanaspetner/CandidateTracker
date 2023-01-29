using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;

namespace CandidateTracker.Data
{
    public class CandidatesDataContext : DbContext
    {
        private string _connectionString;

        public CandidatesDataContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<Candidate> Candidates { get; set; }
    }
}
