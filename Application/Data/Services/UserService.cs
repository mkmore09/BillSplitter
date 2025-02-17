using Application.Data.ServiceAbstraction;
using Application.DTOs;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;

namespace Application.Data.Services
{
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher<User> _passwordHasher;

        public UserService(IUserRepository userRepository, IPasswordHasher<User> passwordHasher)
        {
            _userRepository = userRepository;
            _passwordHasher =passwordHasher;
        }


        public async Task<User> CreateUserAsync(UserDTO userDto)
        {
            var user = new User
            {
                Name = userDto.Name,
                Email = userDto.Email
                
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, userDto.Password);

            await _userRepository.AddAsync(user);

            return user;
            
        }
        
        public async Task<User> GetByEmailAsync(string email)
        {
            return await _userRepository.GetByEmailAsync(email);
        }
        public async Task<IEnumerable<User>> GetAllUser()
        {
            return await _userRepository.GetAllAsync();
        }

        public async Task<List<Group>> GetGroupsAsync(string email)
        {
            var groups = await _userRepository.GetUserWithGroupsAsync(email);

            if (groups == null)
            {
                throw new Exception("User not found.");
            }

            return groups; // Return the user's groups
        }
    }
}


