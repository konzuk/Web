using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using CamboCV.Entity;
using CamboCV.Entity.Table.User;

namespace CamboCV.Web.WebApi.Controllers
{
    public class UserController : ApiController
    {

        private DatabaseContext _context= new DatabaseContext();
        
        private DbSet<UserTable> UserTables
        {
            get
            {
                return Context.Set<UserTable>();
            }
        }

        [HttpGet]
        [Route("api/user/getUserNewUser/{name}")]
        public UserTable getUserNewUser(string name)
        {

            return new UserTable(){ContactName = name};
        }

        [HttpGet]
        [Route("api/user/Create/{n}")]
        public int getUserNewUser(int n)
        {

            for (int i = 0; i < n; i++)
            {
                var us = new UserTable();

                us.ContactCode = "Test" + Guid.NewGuid();
                us.ContactName = "Test" + i.ToString();
                us.IsActive = false;
                us.RegisterDateTime = DateTime.Today;

                UserTables.Add(us);
            }

            Context.SaveChanges();

            return UserTables.Count();
        }

        [HttpGet]
        [Route("api/user/Count")]
        public int CountUserNewUser()
        {
            return UserTables.Count();
        }

        [HttpGet]
        [Route("api/user/RemoveAll")]
        public int deleteUserNewUser()
        {

            UserTables.RemoveRange(UserTables);
            Context.SaveChanges();
            return UserTables.Count();
        }

        [HttpGet]
        [Route("api/user/GetAll/{n}")]
        public ICollection<UserTable> GetAll(int n)
        {
            return n ==0? UserTables.ToList(): UserTables.Take(n).ToList();
        }

        public DatabaseContext Context
        {
            get { return _context; }
            set { _context = value; }
        }
       
    }
}
