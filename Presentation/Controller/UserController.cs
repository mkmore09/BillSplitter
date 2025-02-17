using Application.Data.ServiceAbstraction;
using Application.DTOs;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService; 
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        
        [HttpPost("Register")]
        public async Task<IActionResult> CreateUser([FromBody] UserDTO user)
        {
            if (user == null) return BadRequest("User data is required.");
            if (_userService.GetByEmailAsync(user.Email).Result != null)
            {
                return NotFound("Try with other mail, User alredy exists...");
            }
            var createdUser = await _userService.CreateUserAsync(user);

            return Ok(createdUser);
        }
        [Authorize]
        [HttpGet("GetGroups")]
        public async Task<IActionResult> GetGroups()
        {

            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrWhiteSpace(email))
                return BadRequest("Email is required.");

            var groups = await _userService.GetGroupsAsync(email);
            if (groups == null)
                return NotFound("User not found.");
            return Ok(groups); ;
        }
        [Authorize]
        [HttpGet("GetAllUser")]
        public async Task<IActionResult> GetAllUser()
        {


            var users = await _userService.GetAllUser();

            if (users == null)
                return NotFound("User not found.");

            return Ok(users);
        }
        

    }
}
