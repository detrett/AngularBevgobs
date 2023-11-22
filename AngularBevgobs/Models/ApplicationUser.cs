using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace AngularBevgobs.Models
{
    public class ApplicationUser : IdentityUser<int> // Using int as the primary key type
    {
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        public string? Rank { get; set; } = "Member"; // Default to "Member" if not provided
        
        [NotMapped] // Exclude from database
        public string? Password { get; set; }
        public byte[]? UserPhoto { get; set; }
        public virtual ICollection<Thread> Threads { get; set; } = new List<Thread>();
        public virtual ICollection<Comment> UserComments { get; set; } = new List<Comment>();
    }
}