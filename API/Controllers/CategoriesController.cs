using API.Dto;
using AutoMapper;
using Entity;
using Entity.Interfaces;
using Entity.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CategoriesController(IGenericRepository<Category> repository, IMapper mapper): BaseController
{
  private readonly IGenericRepository<Category> _repository = repository;
  private readonly IMapper _mapper = mapper;

  [HttpGet]
  public async Task<ActionResult<List<CategoriesDto>>> GetCategories()
  {
    var categories = await _repository.ListAllAsync();
    return Ok(_mapper.Map<IReadOnlyList<Category>, IReadOnlyList<CategoriesDto>>(categories));
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<CategoryDto>> GetCategoryById(int id)
  {
    var spec = new CategoriesWithCoursesSpecification(id);
    var category = await _repository.GetEntityWithSpec(spec);
    if(category == null) 
    {
      return NotFound();
    }
    return Ok(_mapper.Map<Category, CategoryDto>(category));
  }
}