using Application.Data.ServiceAbstraction;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Domain.Entities;
using System.Text.RegularExpressions;
using Group = Domain.Entities.Group;
using Application.DTOs;
using Microsoft.AspNet.Identity;

namespace Presentation.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupController : ControllerBase
    {
        private IGroupService _groupService;
        public GroupController(IGroupService groupService) 
        { 
            _groupService = groupService;
        }
        [Authorize]
        [HttpPost("CreateGroup")]
        public async Task<IActionResult> CreateGroup([FromBody] CreateGroupDto createGroupDto)
        {
            if (createGroupDto == null || string.IsNullOrEmpty(createGroupDto.GroupName))
                return BadRequest("Group data is invalid.");
            try
            {
                var email = User.FindFirst(ClaimTypes.Email)?.Value;
                var group = await _groupService.CreateGroupAsync(createGroupDto,email);
                return Ok(new { groupId = group.Id, groupName = group.Name });
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "Internal server error occurred while creating the group.");
            }
        }
        [Authorize]
        [HttpGet("GetGroups")]
        public async Task<IActionResult> GetGroup()
        {
            var groups = await _groupService.GetGroups();
            if (groups == null)
                return NotFound("User not found.");
            return Ok(groups);
        }
        [Authorize]
        [HttpGet("GetExpenses/{groupId}")]
        public async Task<IActionResult> GetExpense(int groupId)
        {
            var expenses = await _groupService.getExpense(groupId);
            if (expenses == null)
                return NotFound("User not found.");
            return Ok(expenses);
        }
        [Authorize]
        [HttpGet("GetUsers/{groupId}")]
        public async Task<IActionResult> GetUsers(int groupId)
        {
            var users = await _groupService.getUsers(groupId);
            if (users == null)
                return NotFound("User not found.");
            return Ok(users);
        }
    }
}
