// Infrastructure/Data/GenericRepository.cs
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Persistence;
namespace Infrastructure
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(AppDbContext context) : base(context)
        {

        }
        public async Task<User> GetByEmailAsync(string email)
        {
            return await _dbSet.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<List<Group>> GetUserWithGroupsAsync(string email)
        {
            return await _dbSet.Where(i => i.Email == email).SelectMany(i => i.Groups).ToListAsync();
        }
    }
}