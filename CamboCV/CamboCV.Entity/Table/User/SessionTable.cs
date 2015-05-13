using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CamboCV.Entity.Table.User
{
  
    public  class SessionTable
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid SessionID { get; set; }
        
        public string BroswerInfo { get; set; }
        public string IPAddress { get; set; }

        public DateTime SessionDate { get; set; }

        public Guid UserID { get; set; }
        [ForeignKey("UserID")]
        public virtual UserTable UserTable { get; set; }
    }
}
