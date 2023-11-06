using AngularBevgobs.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularBevgobs.DAL
{
    public interface IThreadRepository
    {
        Task<IEnumerable<Models.Thread>?> GetAll();
        Task<Models.Thread?> GetThreadById(int id);
        Task Create(Models.Thread thread);
        Task Update(Models.Thread thread);
        Task<bool> Delete(int id);
        Task CreateComment(Comment comment);
        Task<Subforum?> GetSubforumById(int subforumId);
    }
}
