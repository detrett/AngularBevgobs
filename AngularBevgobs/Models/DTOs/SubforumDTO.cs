using Newtonsoft.Json;

namespace AngularBevgobs.Models.DTOs
{
    public class SubforumDTO
    {
        [JsonProperty(nameof(SubforumId))]
        public int SubforumId { get; set; }
        [JsonProperty(nameof(Name))]
        public string? Name { get; set; }
        [JsonProperty(nameof(Description))]
        public string Description { get; set; } = string.Empty;
        [JsonProperty(nameof(BackgroundColor))]
        public string? BackgroundColor { get; set; }
        [JsonProperty(nameof(CurrentPage))]
        public int CurrentPage { get; set; }
        [JsonProperty(nameof(ParentId))]
        public int ParentId { get; set; }
        [JsonProperty(nameof(Threads))]
        public List<ThreadDTO>? Threads { get; set; }
    }
}
