using AngularBevgobs.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularBevgobs.DAL
{
    public interface IThreadRepository
    {
        Task<IEnumerable<Models.Thread>?> GetAll();
        Task<Models.Thread?> GetThreadById(int id);
        Task<bool> Create(Models.Thread thread);
        Task<bool> Update(Models.Thread thread);
        Task<bool> Delete(int id);
        Task<bool> CreateComment(Comment comment);
        Task<Subforum?> GetSubforumById(int subforumId);
    }
}
