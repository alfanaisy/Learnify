using API.Dto;
using API.Helpers;
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
  public async Task<ActionResult<Pagination<CourseDto>>> GetCourses([FromQuery]CourseParams courseParams)
  {
    var spec = new CoursesWithCategoriesSpecification(courseParams);
    var countSpec = new CoursesFiltersCountSpecification(courseParams);
    var total = await _repository.CountResultAsync(countSpec); 

    var courses = await _repository.ListWithSpec(spec);
    var data = _mapper.Map<IReadOnlyList<Course>, IReadOnlyList<CourseDto>>(courses);

    return Ok(new Pagination<CourseDto>(courseParams.PageIndex, courseParams.PageSize, total, data));
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<CourseDto>> GetCourse(Guid id)
  {
    var spec = new CoursesWithCategoriesSpecification(id);
    var course = await _repository.GetEntityWithSpec(spec);
    if (course == null)
    {
      return NotFound();
    }
    return Ok(_mapper.Map<Course, CourseDto>(course));
  }

}