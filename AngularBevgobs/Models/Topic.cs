using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularBevgobs.Models
{
    [Table("Topic")]
    public class Topic
    {
        [Key]
        public int TopicId { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public bool IsLocked { get; set; }
        public bool IsAnnouncement { get; set; }
        public bool IsPinned { get; set; }
        public bool IsFeatured { get; set; }

        [NotMapped]
        public int SubforumId { get; set; }

        public virtual ApplicationUser? User { get; set; }
        public virtual Subforum? ParentSubforum { get; set; }
        public virtual List<Comment>? Comments { get; set; } // List of comments inside of a thread     
        public virtual Comment LastComment { get; set; }

    }
}
