using Entity;
using Entity.Interfaces;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class CoursesController(ICourseRepository repository) : BaseController
{
  private readonly ICourseRepository _repository = repository;

    [HttpGet]
  public async Task<ActionResult<List<Course>>> GetCourses()
  {
    var courses = await _repository.GetCoursesAsync();
    return Ok(courses);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Course>> GetCourse(Guid id)
  {
    var course = await _repository.GetCourseByIdAsync(id);
    if (course == null)
    {
      return NotFound();
    }
    return Ok(course);
  }

}