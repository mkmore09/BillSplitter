using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IUserRepository: IGenericRepository<User>
    {
        Task<List<Group>> GetUserWithGroupsAsync(string email);
        public  Task<User> GetByEmailAsync(string email);
    }
}
