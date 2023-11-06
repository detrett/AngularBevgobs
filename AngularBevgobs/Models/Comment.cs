using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularBevgobs.Models
{
    [Table("Comment")]
    public class Comment
    {
        [Key]
        public int CommentId { get; set; } // Unique comment ID
        
        public int ThreadId { get; set; }  // Thread the comment belongs to
        [ForeignKey("ThreadId")]
        public virtual Thread? Thread { get; set; } 
        // Assuming you have a Thread model

        public int UserId { get; set; } // User the comment belongs to
        [ForeignKey("UserId")]
        public virtual ApplicationUser? User { get; set; }

        // Consider making Title and Body non-nullable if they are essential
        public string? Title { get; set; }   // Comment's title
        public string? Body { get; set; }   // Comment's body

        public DateTime CreatedAt { get; set; } = DateTime.Now; // Creation date
    }
}