using System;
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
                return Context.UserTables;
            }
        }

        [HttpGet]
        [Route("api/user/getUserNewUser/{name}")]
        public UserTable getUserNewUser(string name)
        {

            return new UserTable(){ContactName = name};
        }

        [HttpGet]
        [Route("api/user/getUserNewUser")]
        public UserTable getUserNewUser()
        {
            return new UserTable(){ContactName = "Test"};
        }

        public DatabaseContext Context
        {
            get { return _context; }
            set { _context = value; }
        }
        [HttpGet]
       
        public int AllUser(int arg1, int arg2)
        {
            return arg1 + arg2;
        }
        [HttpGet]
        public int AllUser(int arg1)
        {
            return arg1;
        }
        [HttpGet]
        public IQueryable<UserTable> AllUsers(double arg1)
        {
            return UserTables;
        }

        // GET api/user/5


        public UserTable Get(Guid id)
        {
            if (id == Guid.Empty)
            {
                return new UserTable();
            }
            return UserTables.FirstOrDefault(s => s.ContactId == id);
        }

        // POST api/user
        [HttpPost]
        [Route("api/user/login")]
        public void Post([FromBody] UserTable value)
        {
            UserTables.Add(value);
            Context.SaveChanges();
        }

        // PUT api/user/5
        public void Put(Guid id, UserTable value)
        {
        }

        // DELETE api/user/5
        public void Delete(Guid id)
        {
           var table = UserTables.FirstOrDefault(s => s.ContactId == id);
           UserTables.Remove(table);
            Context.SaveChanges();
        }
    }
}
