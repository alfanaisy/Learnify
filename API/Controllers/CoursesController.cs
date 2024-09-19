using Entity;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class CoursesController: BaseController
{
    private readonly StoreContext _context;

    public CoursesController(StoreContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Course>>> GetCourses()
    {
      var listOfInt = new int[]{1,2,3,4,5};
      return await _context.Courses.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Course>> GetCourse(Guid id)
    {
      var result = await _context.Courses.FindAsync(id);
      if (result == null)
      {
        return NotFound();
      }
      return Ok(result);
    }

}