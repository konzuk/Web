using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Resources;
using System.Web.Http;
using CamboCV.Translate;

namespace CamboCV.Entity.controller
{
    public class ShellController : ApiController
    {
        [HttpGet]
        [Route("api/getLang/{lengKey}")]
        public IHttpActionResult getLang(string lengKey)
        {
            CultureInfo culture = null;

            try
            {
                culture = CultureInfo.GetCultureInfo(lengKey);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);

            }
           
            var lang = ResourceToDictionary(typeof(Lang), culture);
            
            return Ok(lang);
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
