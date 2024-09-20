namespace Entity.Interfaces;

public interface ICategoryRepository
{
  Task<IReadOnlyList<Category>> GetCategoriesAsync();
  Task<Category?> GetCategoryByIdAsync(int id);
}