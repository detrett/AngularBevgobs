using AngularBevgobs.Models;

namespace AngularBevgobs.DAL
{
    public interface IUserRepository
    {
        Task<IEnumerable<ApplicationUser>?> GetAll();
        Task<ApplicationUser?> GetUserById(int id);
        Task Create(ApplicationUser applicationUser);
        Task Update(ApplicationUser applicationUser);
        Task<bool> Delete(int id);
    }
}
