using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularBevgobs.Models
{
    [Table("Thread")]
    public class Thread
    {
        [Key]
        public int ThreadId { get; set; }
        public int UserId { get; set; }
        public virtual ApplicationUser? User { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public virtual List<Comment>? Comments { get; set; } // List of comments inside of a thread 
        public string Description { get; set; } = string.Empty;
        public int SubforumId { get; set; }
        public virtual Subforum? ParentSubforum { get; set; }

        public bool? IsLocked { get; set; } = false;
        public bool? IsAnnouncement { get; set; } = false;
        public bool? IsPinned { get; set; } = false;
        public bool? IsFeatured { get; set; } = false;
    }
}