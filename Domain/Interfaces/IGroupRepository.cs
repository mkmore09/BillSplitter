using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IGroupRepository : IGenericRepository<Group>
    {
        public  Task<IEnumerable<Expense>> GetExpenses(int id);
        public Task<IEnumerable<User>> GetUsers(int id);


    }
}
