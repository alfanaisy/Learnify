using Entity;
using Entity.Interfaces;

namespace Infrastructure;

public class CourseRepository : ICourseRepository
{
    public Task<Course> GetCourseByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<Course>> GetCoursesAsync()
    {
        throw new NotImplementedException();
    }
}