using API.Dto;
using AutoMapper;
using Entity;
using Entity.Interfaces;
using Entity.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CoursesController(IGenericRepository<Course> repository, IMapper mapper) : BaseController
{
  private readonly IGenericRepository<Course> _repository = repository;
    private readonly IMapper _mapper = mapper;

    [HttpGet]
  public async Task<ActionResult<List<CourseDto>>> GetCourses(string? sort)
  {
    var spec = new CourseWithCategoriesSpecification(sort);
    var courses = await _repository.ListWithSpec(spec);
    return Ok(_mapper.Map<IReadOnlyList<Course>, IReadOnlyList<CourseDto>>(courses));
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<CourseDto>> GetCourse(Guid id)
  {
    var spec = new CourseWithCategoriesSpecification(id);
    var course = await _repository.GetEntityWithSpec(spec);
    if (course == null)
    {
      return NotFound();
    }
    return Ok(_mapper.Map<Course, CourseDto>(course));
  }

}