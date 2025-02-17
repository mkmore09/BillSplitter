using Application.Data.ServiceAbstraction;
using Application.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Presentation.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
    {
        private IExpenseService _expenseService;
        public ExpenseController(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }
        [Authorize]
        [HttpPost("AddExpense")]
        public async Task<IActionResult> AddExpense([FromBody] ExpenseDTO expenseDTO)
        {
            try
            {
                var email = User.FindFirst(ClaimTypes.Email)?.Value;
                if (expenseDTO == null)
                    return BadRequest(new { error = "Expense data is invalid." });

                await _expenseService.AddExpenseAsync(expenseDTO,email);
                return Ok(new { message = "Expense created successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }




    }
}
