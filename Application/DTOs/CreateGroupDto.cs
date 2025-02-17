using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class CreateGroupDto
    {
        public string GroupName { get; set; }
        public List<string> UserEmails { get; set; } 
        
    }
}
