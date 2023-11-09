using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularBevgobs.Models.DTOs
{
    public class UserDTO
    {
        [JsonProperty(nameof(CreatedAt))]
        public DateTime CreatedAt { get; set; }
        [JsonProperty(nameof(Rank))]
        public string? Rank { get; set; }
        [JsonProperty(nameof(UserPhoto))]
        public byte[]? UserPhoto { get; set; }
        [JsonProperty(nameof(Threads))]
        public ICollection<ThreadDTO> Threads { get; set; } = new List<ThreadDTO>();
        [JsonProperty(nameof(UserComments))]
        public ICollection<CommentDTO> UserComments { get; set; } = new List<CommentDTO>();
    }
}
