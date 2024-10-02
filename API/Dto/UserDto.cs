
using Entity;

namespace API.Dto
{
    public class UserDto
    {
        public required string Email { get; set; }
        public required string Token { get; set; }
        public BasketDto? Basket { get; set; }
        public List<Course?>? Courses { get; set; }
    }
}