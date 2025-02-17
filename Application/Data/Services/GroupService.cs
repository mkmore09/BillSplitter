using Application.Data.ServiceAbstraction;
using Application.DTOs;
using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Data.Services
{
    public class GroupService : IGroupService
    {
        IGroupRepository _groupRepository;
        IUserRepository _userRepository;
        public GroupService(IGroupRepository groupRepository,IUserRepository userRepository) 
        { 
            _groupRepository = groupRepository;
            _userRepository = userRepository;
        }

        public async Task<Group> CreateGroupAsync(CreateGroupDto createGroupDto,string email)
        {
            var group = new Group
            {
                UserEmail = email,
                Name = createGroupDto.GroupName,
                Users = _userRepository.GetAllAsync().Result.Where(i=>createGroupDto.UserEmails.Contains(i.Email)).ToList()
            };
            await _groupRepository.AddAsync(group);
            return group;
        }

        public async Task<IEnumerable<Group>> GetGroups() {
            IEnumerable<Group> groups = await _groupRepository.GetAllAsync();

            if (groups == null)
            {
                throw new Exception("Data not found");
            }

            return groups; // Return the user's groups
        }
        public async Task<IEnumerable<User>> getUsers(int groupID)
        {
            return await _groupRepository.GetUsers(groupID);
        }
        public async Task<IEnumerable<Expense>> getExpense(int groupID)
        {
            return await _groupRepository.GetExpenses(groupID);
        }
    }
}
