using Entity;
using Entity.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CategoriesController(ICategoryRepository repository): BaseController
{
  private readonly ICategoryRepository _repository = repository;

  [HttpGet]
  public async Task<ActionResult<List<Category>>> GetCategories()
  {
    var categories = await _repository.GetCategoriesAsync();
    return Ok(categories);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Category>> GetCategoryById(int id)
  {
    var category = await _repository.GetCategoryByIdAsync(id);
    if(category == null) 
    {
      return NotFound();
    }
    return Ok(category);
  }
}