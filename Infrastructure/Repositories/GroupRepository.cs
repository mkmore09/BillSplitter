using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class GroupRepository: GenericRepository<Group>, IGroupRepository
    {
        public GroupRepository(AppDbContext context) : base(context)
        {

        }
        public async Task<IEnumerable<Expense>> GetExpenses(int id)
        {
            return await _dbSet.Where(group => group.Id == id).SelectMany(group => group.Expenses).ToListAsync();
        }

        public async Task<IEnumerable<User>> GetUsers(int id)
        {
            return await _dbSet.Where(group => group.Id == id).SelectMany(group => group.Users).ToListAsync();
        }
    }
}
