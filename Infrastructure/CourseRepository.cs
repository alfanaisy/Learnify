using Entity;
using Entity.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class CourseRepository(StoreContext context) : ICourseRepository
{
  private readonly StoreContext _context = context;

    public async Task<Course?> GetCourseByIdAsync(Guid id)
  {
    return await 
      _context.Courses
      .Include(c => c.Category)
      .Include(c => c.Learnings)
      .Include(c => c.Requirements)
      .FirstOrDefaultAsync(x => x.Id == id);
  }

  public async Task<IReadOnlyList<Course>> GetCoursesAsync()
  {
    return await 
      _context.Courses
      .Include(c => c.Category)
      .ToListAsync();
  }
}