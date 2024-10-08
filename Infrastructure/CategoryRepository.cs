using Entity;
using Entity.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class CategoryRepository(StoreContext context) : ICategoryRepository
{
  private readonly StoreContext _context = context;

  public async Task<IReadOnlyList<Category>> GetCategoriesAsync()
  {
    return await 
      _context.Categories
      .Include(c => c.Courses)    
      .ToListAsync();
  }

  public async Task<Category?> GetCategoryByIdAsync(int id)
  {
    return await 
      _context.Categories
      .Include(c => c.Courses)
      .FirstOrDefaultAsync(x => x.Id == id);
  }
}