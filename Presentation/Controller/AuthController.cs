using Application.Data.ServiceAbstraction;
using Application.DTOs;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        IUserService _userService;
        public AuthController(IJwtTokenGenerator jwtTokenGenerator, IUserService userService, IPasswordHasher<User> passwordHasher)
        {
            _jwtTokenGenerator = jwtTokenGenerator;
            _userService = userService;
            _passwordHasher = passwordHasher;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO loginDTO)
        {
            try
            {
                User user = _userService.GetByEmailAsync(loginDTO.Email).Result;
                if (user ==null || PasswordVerificationResult.Success!=_passwordHasher.VerifyHashedPassword(user,user.PasswordHash, loginDTO.Password))
                {
                    return NotFound("Credential arn't correct ");
                }
                var token = _jwtTokenGenerator.GenerateToken(user);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

    }
}
