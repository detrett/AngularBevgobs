using AngularBevgobs.Models;

namespace AngularBevgobs.DAL
{
    public interface IUserRepository
    {
        Task<IEnumerable<ApplicationUser>?> GetAll();
        Task<ApplicationUser?> GetUserById(int id);
        Task<bool> Create(ApplicationUser applicationUser);
        Task<bool> Update(ApplicationUser applicationUser);
        Task<bool> Delete(int id);
    }
}
