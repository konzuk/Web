using System;
using System.Security.Cryptography;
using Microsoft.Owin.Security.Facebook;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.OAuth;

namespace CamboCV.Entity
{

    public enum ApplicationTypes
    {
        JavaScript = 0,
        NativeConfidential = 1
    };

    public class Helper
    {


        public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; set; }
        public static GoogleOAuth2AuthenticationOptions GoogleAuthOptions { get; set; }
        public static FacebookAuthenticationOptions FacebookAuthOptions { get; set; }



        public static string GetHash(string input)
        {
            HashAlgorithm hashAlgorithm = new SHA256CryptoServiceProvider();
       
            byte[] byteValue = System.Text.Encoding.UTF8.GetBytes(input);

            byte[] byteHash = hashAlgorithm.ComputeHash(byteValue);

            return Convert.ToBase64String(byteHash);
        }

        
    }
}