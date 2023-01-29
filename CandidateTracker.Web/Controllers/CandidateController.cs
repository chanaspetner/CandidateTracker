using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CandidateTracker.Data;
using Microsoft.Extensions.Configuration;

namespace CandidateTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly string _connectionString;
        public CandidateController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getpendingcount")]
        [HttpGet]
        public int GetPendingCount()
        {
            var repo = new CandidateRepository(_connectionString);
            return repo.GetRegistrationStatusCount("Pending");
        }

        [Route("getconfirmedcount")]
        [HttpGet]
        public int GetConfirmedCount()
        {
            var repo = new CandidateRepository(_connectionString);
            return repo.GetRegistrationStatusCount("Confirmed");
        }

        [Route("getrefusedcount")]
        [HttpGet]
        public int GetRefusedCount()
        {
            var repo = new CandidateRepository(_connectionString);
            return repo.GetRegistrationStatusCount("Refused");
        }

        [Route("addcandidate")]
        [HttpPost]
        public void AddCandidate(Candidate candidate)
        {
            var repo = new CandidateRepository(_connectionString);
            candidate.RegistrationStatus = RegistrationStatus.Pending;
            repo.AddCandidate(candidate);
        }

        [Route("getpendingcandidates")]
        [HttpGet]
        public List<Candidate> GetPendingCandidates()
        {
            var repo = new CandidateRepository(_connectionString);
            return repo.GetCandidates("Pending");
        }

        [Route("getconfirmedcandidates")]
        [HttpGet]
        public List<Candidate> GetConfirmedCandidates()
        {
            var repo = new CandidateRepository(_connectionString);
            return repo.GetCandidates("Confirmed");
        }

        [Route("getrefusedcandidates")]
        [HttpGet]
        public List<Candidate> GetRefusedCandidates()
        {
            var repo = new CandidateRepository(_connectionString);
            return repo.GetCandidates("Refused");
        }

        [Route("getcandidate")]
        [HttpGet]
        public Candidate GetCandidate(int id)
        {
            var repo = new CandidateRepository(_connectionString);
            return repo.GetCandidate(id);
        }

        [Route("updatestatusconfirmed")]
        [HttpPost]
        public void UpdateStatusConfirmed(int id)
        {
            var repo = new CandidateRepository(_connectionString);
            repo.UpdateStatus("Confirmed", id);
        }

        [Route("updatestatusrefused")]
        [HttpPost]
        public void UpdateStatusRefused(int id)
        {
            var repo = new CandidateRepository(_connectionString);
            repo.UpdateStatus("Refused", id);

        }
    }
}
