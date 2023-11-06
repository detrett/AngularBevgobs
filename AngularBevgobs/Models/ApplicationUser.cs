using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace AngularBevgobs.Models
{
    public class ApplicationUser : IdentityUser<int> // Using int as the primary key type
    {
        public DateTime CreatedAt { get; set; } = DateTime.Now; // The date of creation, defaulted to "right now".
        
        public string? Rank { get; set; } = "Member"; // The user's rank determines which functions they have acces to,
                                                      // defaulted to "Member" if not provided.
        
        [NotMapped] // Exclude from database
        public string? Password { get; set; }   // All users require a password
        public byte[]? UserPhoto { get; set; }  // An optional profile picture
        public virtual ICollection<Thread> Threads { get; set; } = new List<Thread>();  // An optional list of threads
        public virtual ICollection<Comment> UserComments { get; set; } = new List<Comment>(); // An optional list of comments
    }
}