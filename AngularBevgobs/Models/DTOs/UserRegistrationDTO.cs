using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularBevgobs.Models.DTOs
{
    public class UserRegistrationDto
    {
        [JsonProperty("username")]
        public string Username { get; set; }
        
        [JsonProperty("email")]
        public string Email { get; set; }
        

        [JsonProperty("password")]
        public string Password { get; set; }
    }
}