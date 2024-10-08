using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Entity
{
    public class UserCourse
    {
        public required string UserId { get; set; }
        public User? User { get; set; }
        public Guid CourseId { get; set; }
        public Course? Course { get; set; }
    }
}