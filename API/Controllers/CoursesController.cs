using API.Dto;
using AutoMapper;
using Entity;
using Entity.Interfaces;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class CoursesController(ICourseRepository repository, IMapper mapper) : BaseController
{
  private readonly ICourseRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    [HttpGet]
  public async Task<ActionResult<List<CourseDto>>> GetCourses()
  {
    var courses = await _repository.GetCoursesAsync();
    return Ok(_mapper.Map<IReadOnlyList<Course>, IReadOnlyList<CourseDto>>(courses));
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<CourseDto>> GetCourse(Guid id)
  {
    var course = await _repository.GetCourseByIdAsync(id);
    if (course == null)
    {
      return NotFound();
    }
    return Ok(_mapper.Map<Course, CourseDto>(course));
  }

}