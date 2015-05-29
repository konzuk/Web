using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using CamboCV.Entity.Table.OAuth;

namespace CamboCV.Entity.Migrations
{

    public sealed class CustomDropCreateDatabaseIfModelChanges :  DropCreateDatabaseIfModelChanges<DatabaseContext>
    {
        protected override void Seed(DatabaseContext context)
        {
            if (context.Clients.Count() > 0)
            {
                return;
            }

            context.Clients.AddRange(BuildClientsList());
            context.SaveChanges();
        }

        private static List<Client> BuildClientsList()
        {

            List<Client> ClientsList = new List<Client> 
            {
                new Client
                { Id = "ngAuthApp", 
                    Secret= Helper.GetHash("abc@123"), 
                    Name="AngularJS front-end Application", 
                    ApplicationType =  ApplicationTypes.JavaScript, 
                    Active = true, 
                    RefreshTokenLifeTime = 7200,
                    AllowedOrigin = "*"
                    //AllowedOrigin = "http://ngauthenticationweb.azurewebsites.net"
                },
                
            };

            return ClientsList;
        }
    }
}
