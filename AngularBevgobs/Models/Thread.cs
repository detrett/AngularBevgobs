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
        public int ThreadId { get; set; } // Unique thread ID

        public int UserId { get; set; } // User the thread belongs to
        public virtual ApplicationUser? User { get; set; }

        public string Name { get; set; } = string.Empty; // Thread name
        public DateTime CreatedAt { get; set; } = DateTime.Now; // Thread creation date

        public virtual List<Comment>? Comments { get; set; } // List of comments inside of a thread 

        public string Description { get; set; } = string.Empty; // Thread description (becomes the first comment)

        public int SubforumId { get; set; } // Subforum that the thread belongs to
        public virtual Subforum? ParentSubforum { get; set; }

        public bool? IsLocked { get; set; } = false; // The following boolean attributes determine the thread's status
        public bool? IsAnnouncement { get; set; } = false;
        public bool? IsPinned { get; set; } = false;
        public bool? IsFeatured { get; set; } = false;
    }
}