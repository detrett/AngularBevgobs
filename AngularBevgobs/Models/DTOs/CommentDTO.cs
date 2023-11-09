using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularBevgobs.Models.DTOs
{
    public class CommentDTO
    {
        [JsonProperty(nameof(CommentId))]
        public int CommentId { get; set; }
        [JsonProperty(nameof(ThreadId))]
        public int ThreadId { get; set; }
        [JsonProperty(nameof(UserId))]
        public int UserId { get; set; }
        [JsonProperty(nameof(Title))]
        public string? Title { get; set; }
        [JsonProperty(nameof(Body))] 
        public string? Body { get; set; }
        [JsonProperty(nameof(CreatedAt))]
        public DateTime CreatedAt { get; set; }
    }
}
