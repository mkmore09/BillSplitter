using Application.DTOs;
using Domain.Entities;

namespace Application.Data.ServiceAbstraction
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(User user);
    }
    public interface IUserService
    {
        Task<List<Group>> GetGroupsAsync(string email);
        public  Task<User> CreateUserAsync(UserDTO user);
        public Task<User> GetByEmailAsync(string  email);
        public Task<IEnumerable<User>> GetAllUser();
    }
    public interface IGroupService
    {
        public Task<Group> CreateGroupAsync(CreateGroupDto createGroupDto,string email);
        public Task<IEnumerable<Group>> GetGroups();
        public Task<IEnumerable<User>> getUsers(int groupID);
        public Task<IEnumerable<Expense>> getExpense(int groupID);
    }
    public interface IExpenseService
    {
        public Task<Expense> AddExpenseAsync(ExpenseDTO expenseDTO,string email);
    }
}


