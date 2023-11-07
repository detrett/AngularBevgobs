using Microsoft.AspNetCore.Mvc;
using AngularBevgobs.Models;

namespace AngularBevgobs.DAL
{
    public interface ISubforumRepository
    {
        Task<IEnumerable<Subforum>?> GetAll();
        Task<Subforum?> GetSubforumById(int id);
        Task<bool> Create(Subforum subforum);
        Task<bool> Update(Subforum subforum);
        Task<bool> Delete(int id);
    }
}
