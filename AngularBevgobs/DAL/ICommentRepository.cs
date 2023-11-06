using AngularBevgobs.Models;

namespace AngularBevgobs.DAL
{
    public interface ICommentRepository
    {
        Task<IEnumerable<Comment>?> GetAll();
        Task<Comment?> GetCommentById(int id);
        Task<bool> Create(Comment comment);
        Task<bool> Update(Comment comment);
        Task<bool> Delete(int id);
    }
}
