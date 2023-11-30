using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace AngularBevgobs.Models.DTOs
{
    public class UpdateUserDTO
    {
        [JsonProperty("email")]
        [EmailAddress]
        public string Email { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [JsonProperty("profilePicture")]
        public IFormFile ProfilePicture { get; set; }
    }
}
