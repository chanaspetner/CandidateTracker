using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CandidateTracker.Data
{
    public class CandidateRepository
    {
        private readonly string _connectionString;

        public CandidateRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public int GetRegistrationStatusCount(string status)
        {
            var ctx = new CandidatesDataContext(_connectionString);
            if(status == "Pending")
            {
                return ctx.Candidates.Where(c => c.RegistrationStatus == RegistrationStatus.Pending).Count();
            }
            else if (status == "Confirmed")
            {
                return ctx.Candidates.Where(c => c.RegistrationStatus == RegistrationStatus.Confirmed).Count();
            }
            else 
            {
                return ctx.Candidates.Where(c => c.RegistrationStatus == RegistrationStatus.Refused).Count();
            }
        }

        public List<Candidate> GetCandidates(string status)
        {
            var ctx = new CandidatesDataContext(_connectionString);
            if (status == "Pending")
            {
                return ctx.Candidates.Where(c => c.RegistrationStatus == RegistrationStatus.Pending).ToList();
            }
            else if (status == "Confirmed")
            {
                return ctx.Candidates.Where(c => c.RegistrationStatus == RegistrationStatus.Confirmed).ToList();
            }
            else
            {
                return ctx.Candidates.Where(c => c.RegistrationStatus == RegistrationStatus.Refused).ToList();
            }
        }

        public void AddCandidate(Candidate candidate)
        {
            var ctx = new CandidatesDataContext(_connectionString);
            ctx.Candidates.Add(candidate);
            ctx.SaveChanges();
        }

        public Candidate GetCandidate(int id)
        {
            var ctx = new CandidatesDataContext(_connectionString);
            return ctx.Candidates.FirstOrDefault(c => c.Id == id);
        }

        public void UpdateStatus(string status, int id)
        {
            var ctx = new CandidatesDataContext(_connectionString);
                if(status == "Confirmed")
                {
                    ctx.Database.ExecuteSqlInterpolated($"UPDATE Candidates SET RegistrationStatus = 1 WHERE Id = {id}");
                }
                else
                {
                    ctx.Database.ExecuteSqlInterpolated($"UPDATE Candidates SET RegistrationStatus = 2 WHERE Id = {id}");
                }
                
            
        }
    }
}
