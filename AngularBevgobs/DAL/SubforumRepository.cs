using AngularBevgobs.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularBevgobs.DAL
{
    public class SubforumRepository : ISubforumRepository
    {
        private readonly ForumDbContext _db;
        private readonly ILogger<SubforumRepository> _logger;

        public SubforumRepository(ForumDbContext db, ILogger<SubforumRepository> logger)
        {
            _db = db;
            _logger = logger;
        }
        public async Task<bool> Create(Subforum subforum)
        {
            try
            {
                _db.Subforums.Add(subforum);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"[SubforumRepository] Subforum creation failed for subforum {subforum.SubforumId}, error message: {e}");
                return false;
            }

        }

        public async Task<bool> Delete(int id)
        {
            var item = await _db.Subforums.FindAsync(id);
            if (item == null)
            {
                return false;
            }

            _db.Subforums.Remove(item);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Subforum>?> GetAll()
        {
            return await _db.Subforums.ToListAsync();
        }

        public async Task<Subforum?> GetSubforumById(int id)
        {
            return await _db.Subforums.FindAsync(id);
        }


        public async Task<bool> Update(Subforum subforum)
        {
            try
            {
                _db.Subforums.Update(subforum);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError($"[SubforumRepository] Subforum update failed for subforum {subforum.SubforumId}, error message: {e}");
                return false;
            }

        }
    }
}
