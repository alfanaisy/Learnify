using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class RegisterDto: LoginDto
    {
        public required string Username { get; set; }
    }
}