using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CamboCV.Entity.Table.User
{
    public class ContactTable
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ContactId { get; set; }
        [Index("ContactCode_Index", 1, IsUnique = true), Required, MaxLength(200)]
        public string ContactCode { get; set; }
        public string ContactName { get; set; }

    }
}
