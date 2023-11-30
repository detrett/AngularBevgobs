using Newtonsoft.Json;

namespace AngularBevgobs.Models.DTOs
{
    public class ForumDTO
    {
        [JsonProperty(nameof(ForumId))]
        public int ForumId { get; set; }
        [JsonProperty(nameof(Name))]
        public string? Name { get; set; }
        [JsonProperty(nameof(Subforums))]
        public List<SubforumDTO>? Subforums { get; set; }
    }
}
