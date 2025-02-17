using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class ExpenseDTO
    {
        public string Description { get; set; }
        public int Amount { get; set; }
        public int GroupId { get; set; }
        public List<string> UserEmails { get; set; }
    }
}
