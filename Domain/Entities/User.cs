
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class User
    {
        [Key]
        public required string Email { get; set; }
        public required string Name { get; set; }
        public string PasswordHash { get; set; }
        public ICollection<Group> Groups { get; set; }
        public ICollection<Expense> Expenses { get; set; }
    }
}