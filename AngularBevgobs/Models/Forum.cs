using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularBevgobs.Models
{
    [Table("Forum")]
    public class Forum
    {
        [Key]
        public int ForumId { get; set; }    // All forums have an ID

        [Required(ErrorMessage = "Name is required.")]
        [RegularExpression(@"[0-9a-zA-ZæøåÆØÅ. \-]{2,20}", 
            ErrorMessage = "The Name must be numbers or letters and between 2 to 20 characters long.")]
        public string Name { get; set; } = string.Empty; // All forums have a name. Example: 'Main Forum'

        public virtual List<Subforum>? Subforums { get; set; }  // Forums contain a list of subforums associated with them.
    }
}