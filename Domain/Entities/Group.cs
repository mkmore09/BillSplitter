using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Group
    {
        [Key]
        
        public int Id { get; set; }
        public string UserEmail { get; set; }
        public string Name { get; set; }
        public ICollection<User> Users { get; set; }
        public ICollection<Expense> Expenses { get; set; }

    }
}
