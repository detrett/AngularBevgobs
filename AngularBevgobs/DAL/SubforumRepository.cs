using AngularBevgobs.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularBevgobs.DAL
{
    public class SubforumRepository : ISubforumRepository
    {
        private readonly ForumDbContext _db;

        public SubforumRepository(ForumDbContext db)
        {
            _db = db;
        }
        public async Task Create(Subforum subforum)
        {
            _db.Subforums.Add(subforum);
            await _db.SaveChangesAsync();

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


        public async Task Update(Subforum subforum)
        {
            _db.Subforums.Update(subforum);
            await _db.SaveChangesAsync();
        }
    }
}
