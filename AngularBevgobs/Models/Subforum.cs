using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AngularBevgobs.Models
{
    [Table("Subforum")]
    public class Subforum
    {
        [Key]
        public int SubforumId { get; set; } // All subforums require an Id

        [Required(ErrorMessage = "Name is required.")]
        [RegularExpression(@"[0-9a-zA-ZæøåÆØÅ. \-]{2,20}",
            ErrorMessage = "The Name must be numbers or letters and between 2 to 20 characters long.")]
        public string Name { get; set; } = string.Empty; // Example: 'Introduce Yourself'

        [Required(ErrorMessage = "Description is required.")]
        public string Description { get; set; } = string.Empty; // Example: 'A space for new members to introduce themselves to the community.'

        public string? BackgroundColor { get; set; } // Options: 'dark' or 'light'

        public int ForumId { get; set; }    // Mapping the relationship between forum/subforum
        //[JsonIgnore]
        public virtual Forum? ParentForum { get; set; }

        public int CurrentPage { get; set; }    

        public virtual List<Models.Thread>? Threads { get; set; } // List of threads inside of a subforum
    }
}