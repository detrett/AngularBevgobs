using AngularBevgobs.Models;

namespace AngularBevgobs.DAL
{
    public interface IForumRepository
    {
        Task<IEnumerable<Forum>?> GetAll();
        Task<Forum?> GetForumById(int id);
        Task<bool> Create(Forum forum);
        Task<bool> Update(Forum forum);
        Task<bool> Delete(int id);
    }
}
