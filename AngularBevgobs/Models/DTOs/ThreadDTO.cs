using Newtonsoft.Json;

namespace AngularBevgobs.Models.DTOs
{
    public class ThreadDTO
    {
        [JsonProperty(nameof(ThreadId))]
        public int ThreadId { get; set; }
        [JsonProperty(nameof(UserId))]
        public int UserId { get; set; }
        [JsonProperty(nameof(Name))]
        public string Name { get; set; } = string.Empty;
        [JsonProperty(nameof(CreatedAt))]
        public DateTime CreatedAt { get; set; }
        [JsonProperty(nameof(Comments))]
        public List<CommentDTO>? Comments { get; set; }
        [JsonProperty(nameof(Description))]
        public string Description { get; set; } = string.Empty;
        [JsonProperty(nameof(ParentId))]
        public int ParentId { get; set; }
        [JsonProperty(nameof(IsLocked))]
        public bool? IsLocked { get; set; }
        [JsonProperty(nameof(IsAnnouncement))]
        public bool? IsAnnouncement { get; set; }
        [JsonProperty(nameof(IsPinned))]
        public bool? IsPinned { get; set; }
        [JsonProperty(nameof(IsFeatured))]
        public bool? IsFeatured { get; set; }
    }
}
