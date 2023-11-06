using AngularBevgobs.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularBevgobs.DAL
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ForumDbContext _db;

        public CommentRepository(ForumDbContext db)
        {
            _db = db;
        }

        public async Task Create(Comment comment)
        {
            _db.Comments.Add(comment);
            await _db.SaveChangesAsync();
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _db.Comments.FindAsync(id);
            if (item == null)
            {
                return false;
            }

            _db.Comments.Remove(item);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Comment>?> GetAll()
        {
            return await _db.Comments.ToListAsync();
        }

        public async Task<Comment?> GetCommentById(int id)
        {
            return await _db.Comments.FindAsync(id);
        }

        public async Task Update(Comment comment)
        {
            _db.Comments.Update(comment);
            await _db.SaveChangesAsync();
        }
    }
}
