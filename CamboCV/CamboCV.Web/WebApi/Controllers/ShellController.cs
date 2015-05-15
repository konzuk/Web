using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Resources;
using System.Threading;
using System.Web.Http;
using CamboCV.Entity.Table.User;
using CamboCV.Translate;

namespace CamboCV.Web.WebApi.Controllers
{
    public class ShellController : ApiController
    {
        [HttpGet]
        [Route("api/getLang/{lengKey}")]
        public Dictionary<string, string> getLang(string lengKey)
        {
            
            var lang = ResourceToDictionary(typeof(Lang), CultureInfo.GetCultureInfo(lengKey));
            
            return lang;
        }

        private static Dictionary<string, string> ResourceToDictionary(Type resource, CultureInfo culture)
        {
            ResourceManager rm = new ResourceManager(resource);
            PropertyInfo[] pis = resource.GetProperties(BindingFlags.Public | BindingFlags.Static);
            IEnumerable<KeyValuePair<string, string>> values =
                from pi in pis
                where pi.PropertyType == typeof(string)
                select new KeyValuePair<string, string>(
                    pi.Name,
                    rm.GetString(pi.Name, culture));
            Dictionary<string, string> dictionary = values.ToDictionary(k => k.Key, v => v.Value);

            return dictionary;
        }
    }
}
