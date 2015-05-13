using System;
using System.Collections.Generic;

namespace CamboCV.Entity.Table.User
{
    public class UserTable : ContactTable
    {
        public string Password { get; set; }
        public bool IsActive { get; set; }
        public string RegisterPhone { get; set; }
        public string RegisterEmail { get; set; }
        public DateTime RegisterDateTime { get; set; }
        public string RegisterMethod { get; set; }


        public virtual ICollection<SessionTable> SessionTables { get; set; }
    }
}