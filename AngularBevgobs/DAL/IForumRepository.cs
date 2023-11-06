using AngularBevgobs.Models;

namespace AngularBevgobs.DAL
{
    public interface IForumRepository
    {
        Task<IEnumerable<Forum>?> GetAll();
        Task<Forum?> GetForumById(int id);
        Task Create(Forum forum);
        Task Update(Forum forum);
        Task<bool> Delete(int id);
    }
}
