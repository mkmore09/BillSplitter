using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Expense
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public string UserEmail { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
        public ICollection<User> Users { get; set; }
    }

}
