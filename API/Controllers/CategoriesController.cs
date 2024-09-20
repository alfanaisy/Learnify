using API.Dto;
using AutoMapper;
using Entity;
using Entity.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CategoriesController(ICategoryRepository repository, IMapper mapper): BaseController
{
  private readonly ICategoryRepository _repository = repository;
  private readonly IMapper _mapper = mapper;

  [HttpGet]
  public async Task<ActionResult<List<CategoriesDto>>> GetCategories()
  {
    var categories = await _repository.GetCategoriesAsync();
    return Ok(_mapper.Map<IReadOnlyList<Category>, IReadOnlyList<CategoriesDto>>(categories));
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<CategoryDto>> GetCategoryById(int id)
  {
    var category = await _repository.GetCategoryByIdAsync(id);
    if(category == null) 
    {
      return NotFound();
    }
    return Ok(_mapper.Map<Category, CategoryDto>(category));
  }
}