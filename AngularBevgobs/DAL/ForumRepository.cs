using AngularBevgobs.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularBevgobs.DAL
{
    public class ForumRepository : IForumRepository
    {
        private readonly ForumDbContext _db;
        private readonly ILogger<ForumRepository> _logger;

        public ForumRepository(ForumDbContext db, ILogger<ForumRepository> logger)
        {
            _db = db;
            _logger = logger;
        }
        public async Task<bool> Create(Forum forum)
        {
            try
            {
                _db.Forums.Add(forum);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"[ForumRepository] Forum update failed for forum {forum.ForumId}, error message: {e}");
                return false;
            }


        }

        public async Task<bool> Delete(int id)
        {
            var item = await _db.Forums.FindAsync(id);
            if (item == null)
            {
                return false;
            }

            _db.Forums.Remove(item);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Forum>?> GetAll()
        {
            try
            {
                return await _db.Forums.ToListAsync();
            }
            catch (Exception e)
            {
                _logger.LogError("[ForumRepository] forums ToListAsync() failed when GetAll(), error message: {e}", e.Message);
                return null;
            }
        }

        public async Task<Forum?> GetForumById(int id)
        {
            return await _db.Forums.FindAsync(id);
        }

        public async Task<bool> Update(Forum forum)
        {
            try
            {
                _db.Forums.Update(forum);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"[ForumRepository] Forum update failed for forum {forum.ForumId}, error message: {e}");
                return false;
            }

        }
    }
}
