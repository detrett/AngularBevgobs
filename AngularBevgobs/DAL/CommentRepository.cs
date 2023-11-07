using AngularBevgobs.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularBevgobs.DAL
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ForumDbContext _db;
        private readonly ILogger<CommentRepository> _logger;

        public CommentRepository(ForumDbContext db, ILogger<CommentRepository> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task<bool> Create(Comment comment)
        {
            try
            {
                _db.Comments.Add(comment);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"[CommentRepository] Comment creation failed for comment {comment.CommentId}, error message: {e}");
                return false;
            }

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

        public async Task<bool> Update(Comment comment)
        {
            try
            {
                _db.Comments.Update(comment);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"[CommentRepository] Comment update failed for comment {comment.CommentId}, error message: {e}");
                return false;
            }
            
        }
    }
}
