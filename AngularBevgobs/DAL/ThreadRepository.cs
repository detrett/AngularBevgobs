using AngularBevgobs.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularBevgobs.DAL
{
    public class ThreadRepository : IThreadRepository
    {
        private readonly ForumDbContext _db;

        public ThreadRepository(ForumDbContext db)
        {
            _db = db;
        }

        public async Task Create(Models.Thread thread)
        {
            _db.Threads.Add(thread);
            await _db.SaveChangesAsync();
        }

        public async Task CreateComment(Comment comment)
        {
            _db.Comments.Add(comment);
            await _db.SaveChangesAsync();
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _db.Threads.FindAsync(id);
            if (item == null)
            {
                return false;
            }

            foreach(var comment in item.Comments.ToList())
            {
                _db.Comments.Remove(comment);
                await _db.SaveChangesAsync();
            }

            _db.Threads.Remove(item);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Models.Thread>?> GetAll()
        {
            return await _db.Threads.ToListAsync();
        }

        public async Task<IEnumerable<Models.Thread>?> GetTopicsBySubforum(int subforumId, int pageNumber, int pageSize)
        {
            return await _db.Threads.Where(t => t.SubforumId ==  subforumId)
                .OrderByDescending(t => t.CreatedAt)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<Models.Thread?> GetThreadById(int id)
        {
            return await _db.Threads.FindAsync(id);
        }

        public async Task<Subforum?> GetSubforumById(int id)
        {
            return await _db.Subforums.FindAsync(id);
        }

        public async Task Update(Models.Thread thread)
        {
            var firstComment = thread.Comments.First();
            firstComment.Body = thread.Description;
            firstComment.Title = thread.Name;

            _db.Comments.Update(firstComment);
            _db.Threads.Update(thread);

            await _db.SaveChangesAsync();
        }
    }
}
