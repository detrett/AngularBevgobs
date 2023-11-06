using AngularBevgobs.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AngularBevgobs.DAL
{
    public class ForumDbContext : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>
    {
        // The Forum's DB Constructor
        public ForumDbContext(DbContextOptions<ForumDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Forum> Forums { get; set; }
        public DbSet<Subforum> Subforums { get; set; }
        public DbSet<Models.Thread> Threads { get; set; }
        public DbSet<Comment> Comments { get; set; }
        // Removed the DbSet<ApplicationUser> Users line because IdentityDbContext already provides this

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Any additional fluent API configurations can be added here
        }
    }
}