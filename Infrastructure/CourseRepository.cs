using Entity;
using Entity.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class CourseRepository(StoreContext context) : ICourseRepository
{
  private readonly StoreContext _context = context;

    public async Task<Course?> GetCourseByIdAsync(Guid id)
  {
    return await _context.Courses.FindAsync(id);
  }

  public async Task<IReadOnlyList<Course>> GetCoursesAsync()
  {
    return await _context.Courses.ToListAsync();
  }
}