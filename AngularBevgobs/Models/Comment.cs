using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularBevgobs.Models
{
    [Table("Comment")]
    public class Comment
    {
        [Key]
        public int CommentId { get; set; }
        
        public int ThreadId { get; set; } 
        [ForeignKey("ThreadId")]
        public virtual Thread? Thread { get; set; } // Assuming you have a Thread model

        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual ApplicationUser? User { get; set; }

        // Consider making Title and Body non-nullable if they are essential
        public string? Title { get; set; }
        public string? Body { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}