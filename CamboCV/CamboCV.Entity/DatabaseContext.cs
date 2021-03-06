﻿using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using CamboCV.Entity.Migrations;
using CamboCV.Entity.Table.OAuth;
using Microsoft.AspNet.Identity.EntityFramework;

namespace CamboCV.Entity
{
   
    public class DatabaseContext : IdentityDbContext<IdentityUser>
    {

        public DatabaseContext()
            : base("name = CamboCVDB")
        {
            
            Database.SetInitializer(new CustomDropCreateDatabaseIfModelChanges());
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;
        }


        public DbSet<Client> Clients { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        

        

        protected override void OnModelCreating(DbModelBuilder tableBuilder)
        {
            tableBuilder.Properties<string>().Configure(s=>s.IsUnicode(true));
            base.OnModelCreating(tableBuilder);

        }
    }
}
