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
    public class ExpenseService : IExpenseService
    {
        IExpenseRepository _expenseRepository;
        IUserRepository _userRepository;
        IGroupRepository _groupRepository;
        public ExpenseService(IExpenseRepository expenseRepository, IUserRepository userRepository, IGroupRepository groupRepository)
        {
            _expenseRepository = expenseRepository;
            _userRepository = userRepository;
            _groupRepository = groupRepository;
        }

        public async Task<Expense> AddExpenseAsync(ExpenseDTO expenseDTO, string email)
        {
            var expense = new Expense
            {
                UserEmail = email,
                GroupId = expenseDTO.GroupId,
                Group = _groupRepository.GetByIdAsync(expenseDTO.GroupId).Result,
                Description = expenseDTO.Description,
                Amount = expenseDTO.Amount,
                Users = _userRepository.GetAllAsync().Result.Where(i => expenseDTO.UserEmails.Contains(i.Email)).ToList()
            };
            await _expenseRepository.AddAsync(expense);
            return expense;
        }

        
    }
}
