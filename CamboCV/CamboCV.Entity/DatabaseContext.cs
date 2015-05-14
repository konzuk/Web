using System.Data.Entity;
using CamboCV.Entity.Table.User;

namespace CamboCV.Entity
{
   
    public class DatabaseContext : DbContext
    {

        public DatabaseContext()
            : base("name = CamboCVDB")
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<DatabaseContext>());
            //this.Configuration.LazyLoadingEnabled = true;
            //this.Configuration.AutoDetectChangesEnabled = true;
        }
        
        //User Tables
        public DbSet<UserTable> UserTables { get; set; }
       

        //Contact Tables
        public DbSet<ContactTable> ContactTables { get; set; }
        public DbSet<SessionTable> SessionTables { get; set; }
       

        protected override void OnModelCreating(DbModelBuilder TableBuilder)
        {

           
            TableBuilder.Properties<string>().Configure(t => t.IsUnicode(true));


           
            base.OnModelCreating(TableBuilder);
        }
    }
}
